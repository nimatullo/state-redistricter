interface District {
  type: string;
  id: number;
  properties: {
    name: string;
  },
  geometry: Geometry;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

class DistrictsService {
  API: string

  constructor() {
    this.API = "http://localhost:8080/api";
  }

  async getGeoJSONForState(state: string): Promise<District[]> {
    return fetch(`${this.API}/states/${state}/shape`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch geojson");
        }
      }).catch((error) => {
        throw new Error("Failed to fetch geojson");
    });
  }
}

export default new DistrictsService();

