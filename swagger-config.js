import swaggerJsDocs from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "User Dashboard",
      version: "1.0.0",
      description: "",
      servers: ["http://localhost:8001"],
      contact: {
        name: "Lalit Mohan",
        email: "lalit.onclick@gmail.com"
      }
    },
    produces: ["application/json"]
  },
  apis: ["./api/user/*.js"]
};
export default swaggerJsDocs(swaggerOptions);
