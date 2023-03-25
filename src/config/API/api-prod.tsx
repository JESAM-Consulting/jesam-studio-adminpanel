    // // Local
    const protocol = "https";
          const host = "abe7-2405-201-200d-1c68-e20d-9416-8bde-8139.ngrok.io/forwardFinance/api/v1";
        
          // Live

          // const protocol = "https";
          // const host = "api.enovltec.rejoicehub.com/api/v1/";
const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
