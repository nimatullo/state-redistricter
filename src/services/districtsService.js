class DistrictsService {
  constructor() {
    this.GH_API =
      "https://api.github.com/repos/unitedstates/districts/contents/cds/2012";
    this.GH_RAW_URL =
      "https://raw.githubusercontent.com/unitedstates/districts/gh-pages/cds/2012";
  }

  async getGeoJSONForState(state, totalDistricts) {
    const districts = [];

    for (let i = 1; i <= totalDistricts; i++) {
      const district = await this._fetchDistrict(state, i);
      districts.push(district);
    }

    return districts;
  }

  async _fetchDistrict(state, district) {
    const response = await fetch(
      `${this.GH_RAW_URL}/${state}-${district}/shape.geojson`
    );
    const districtGeoJSON = await response.json();

    return {
      type: "Feature",
      properties: {
        name: state + district,
      },
      geometry: districtGeoJSON,
    };
  }
}

export default new DistrictsService();
