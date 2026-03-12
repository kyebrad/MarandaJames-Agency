import { useState } from 'react';
import { MapPin, Search, ExternalLink, Loader2, Info } from 'lucide-react';
import { ai } from '../lib/gemini';
import Markdown from 'react-markdown';

type ResourceState = {
  isLoading: boolean;
  content: string | null;
  links: Array<{ uri: string; title?: string }>;
  error: string | null;
};

export default function CommunityResources() {
  const [mapsState, setMapsState] = useState<ResourceState>({ isLoading: false, content: null, links: [], error: null });
  const [searchState, setSearchState] = useState<ResourceState>({ isLoading: false, content: null, links: [], error: null });

  const getCoordinates = (): Promise<{latitude: number, longitude: number}> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ latitude: 43.0962, longitude: -79.0377 }); // Niagara Falls default
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          resolve({ latitude: 43.0962, longitude: -79.0377 }); // Fallback
        },
        { timeout: 5000 }
      );
    });
  };

  const handleFindNearby = async () => {
    setMapsState({ isLoading: true, content: null, links: [], error: null });
    try {
      const coords = await getCoordinates();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "What are some nearby hospitals, urgent care centers, and police stations? Please provide their names and brief details.",
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: coords.latitude,
                longitude: coords.longitude
              }
            }
          }
        },
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks.map(c => c.maps).filter(Boolean) as Array<{ uri: string; title?: string }>;

      setMapsState({
        isLoading: false,
        content: response.text || "No details found.",
        links: links,
        error: null
      });
    } catch (error) {
      console.error("Maps error:", error);
      setMapsState({ isLoading: false, content: null, links: [], error: "Failed to load nearby locations. Please try again." });
    }
  };

  const handleSearchNews = async () => {
    setSearchState({ isLoading: true, content: null, links: [], error: null });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Find recent community resources, job fairs, or support programs for women in Niagara Falls, NY. Summarize the findings.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const links = chunks.map(c => c.web).filter(Boolean) as Array<{ uri: string; title?: string }>;

      setSearchState({
        isLoading: false,
        content: response.text || "No details found.",
        links: links,
        error: null
      });
    } catch (error) {
      console.error("Search error:", error);
      setSearchState({ isLoading: false, content: null, links: [], error: "Failed to search community resources. Please try again." });
    }
  };

  return (
    <section id="resources" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-olive uppercase mb-3">Live Information</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-amethyst-dark mb-4">
            Community Resources & Safe Locations
          </h3>
          <p className="text-gray-600">
            Use our AI-powered tools to find up-to-date information on nearby safe locations and the latest community programs in Niagara Falls, NY.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Maps Grounding Card */}
          <div className="bg-lavender-base rounded-3xl p-8 border border-amethyst/10 shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Nearby Safe Locations</h4>
                <p className="text-sm text-gray-500">Hospitals, Urgent Care, Police Stations</p>
              </div>
            </div>
            
            {!mapsState.content && !mapsState.isLoading && !mapsState.error && (
              <div className="flex-grow flex flex-col items-center justify-center py-12 text-center">
                <Info className="w-8 h-8 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-6 max-w-xs">Click below to find the closest emergency and support facilities using Google Maps data.</p>
                <button 
                  onClick={handleFindNearby}
                  className="bg-olive hover:bg-olive-dark text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Find Nearby Locations
                </button>
              </div>
            )}

            {mapsState.isLoading && (
              <div className="flex-grow flex flex-col items-center justify-center py-12 text-center">
                <Loader2 className="w-8 h-8 text-olive animate-spin mb-4" />
                <p className="text-gray-500">Locating nearby facilities...</p>
              </div>
            )}

            {mapsState.error && (
              <div className="flex-grow flex flex-col items-center justify-center py-12 text-center text-red-500">
                <p>{mapsState.error}</p>
                <button onClick={handleFindNearby} className="mt-4 text-olive underline text-sm">Try Again</button>
              </div>
            )}

            {mapsState.content && (
              <div className="flex-grow flex flex-col">
                <div className="markdown-body prose prose-sm prose-a:text-olive max-w-none mb-6 overflow-y-auto max-h-64 pr-2">
                  <Markdown>{mapsState.content}</Markdown>
                </div>
                
                {mapsState.links.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Map Links</h5>
                    <div className="flex flex-wrap gap-2">
                      {mapsState.links.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs bg-white border border-gray-200 hover:border-olive hover:text-olive px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {link.title || 'View on Maps'}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Search Grounding Card */}
          <div className="bg-lavender-base rounded-3xl p-8 border border-amethyst/10 shadow-sm flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-amethyst/10 flex items-center justify-center text-amethyst">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">Latest Community Programs</h4>
                <p className="text-sm text-gray-500">Job Fairs, Support Groups, News</p>
              </div>
            </div>
            
            {!searchState.content && !searchState.isLoading && !searchState.error && (
              <div className="flex-grow flex flex-col items-center justify-center py-12 text-center">
                <Info className="w-8 h-8 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-6 max-w-xs">Search the web for recent news, job fairs, and community resources for women in Niagara Falls.</p>
                <button 
                  onClick={handleSearchNews}
                  className="bg-amethyst hover:bg-amethyst-dark text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search Local Programs
                </button>
              </div>
            )}

            {searchState.isLoading && (
              <div className="flex-grow flex flex-col items-center justify-center py-12 text-center">
                <Loader2 className="w-8 h-8 text-amethyst animate-spin mb-4" />
                <p className="text-gray-500">Searching recent resources...</p>
              </div>
            )}

            {searchState.error && (
              <div className="flex-grow flex flex-col items-center justify-center py-12 text-center text-red-500">
                <p>{searchState.error}</p>
                <button onClick={handleSearchNews} className="mt-4 text-amethyst underline text-sm">Try Again</button>
              </div>
            )}

            {searchState.content && (
              <div className="flex-grow flex flex-col">
                <div className="markdown-body prose prose-sm prose-a:text-amethyst max-w-none mb-6 overflow-y-auto max-h-64 pr-2">
                  <Markdown>{searchState.content}</Markdown>
                </div>
                
                {searchState.links.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Source Links</h5>
                    <div className="flex flex-wrap gap-2">
                      {searchState.links.map((link, idx) => (
                        <a 
                          key={idx} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs bg-white border border-gray-200 hover:border-amethyst hover:text-amethyst px-3 py-1.5 rounded-lg transition-colors truncate max-w-[200px]"
                          title={link.title || link.uri}
                        >
                          <span className="truncate">{link.title || 'Source Link'}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
