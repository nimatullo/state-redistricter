
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
      .then((response) => response.json())
  }
}

export default new DistrictsService();

