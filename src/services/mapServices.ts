import RequestError from "../helpers/requestError";
import { Client } from "@googlemaps/google-maps-services-js";

class MapsServices {
  client = new Client({});
  // * show ALL
  found_by_location = async (params: any) => {
    const lat = params.lat;
    const lng = params.lng;

    if (!lat || !lng) {
      throw RequestError(400, "Not get params lat or lng ");
    }
    const result = await this.client.geocode({
      params: {
        // locations: [{ lat, lng }],
        address: `${lat},${lng}`,
        key: process.env.MAP_KEY!,
      },
      timeout: 1000, // milliseconds
    });

    console.log("result", result.data?.results[0]);

    const adress = result.data?.results[0];

    if (!adress) {
      throw RequestError(400, "Unable to fetch Goods");
    }

    return adress;
  };

  found_by_adress = async (params: any) => {
    const address = params.address;

    if (!address) {
      throw RequestError(400, "Not get params address");
    }

    const result = await this.client.geocode({
      params: {
        address,
        key: process.env.MAP_KEY!,
      },
      timeout: 1000, // milliseconds
    });

    console.log("result", result.data?.results[0]);

    const location = result.data?.results[0].geometry.location;

    if (!location) {
      throw RequestError(400, "Unable to fetch Goods");
    }

    return location;
  };
}

const mapsServices = new MapsServices();
export default mapsServices;
