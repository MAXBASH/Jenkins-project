import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>DevOps Pipeline with Jenkins for NodeJS application</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f9f9f9;
      }
      h1 {
        text-align: center;
      }
      table {
        margin: 0 auto;
        border-collapse: collapse;
        width: 80%;
      }
      th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      }
      th {
        background-color: #e0e0e0;
      }
    </style>
  </head>
  <body>
    <h1>DevOps Pipeline with Jenkins for NodeJS application</h1>
    <table>
      <tr>
        <th>Tool</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Jenkins</td>
        <td>Continuous Integration and Delivery</td>
      </tr>
      <tr>
        <td>Docker</td>
        <td>Containerization Platform</td>
      </tr>
      <tr>
        <td>Kubernetes</td>
        <td>Container Orchestration</td>
      </tr>
      <tr>
        <td>Git</td>
        <td>Version Control System</td>
      </tr>
      <tr>
        <td>Ansible</td>
        <td>Configuration Management</td>
      </tr>
      <tr>
        <td>Terraform</td>
        <td>Infrastructure as Code</td>
      </tr>
      <tr>
        <td>Prometheus</td>
        <td>Monitoring and Alerting</td>
      </tr>
      <tr>
        <td>Grafana</td>
        <td>Data Visualization</td>
      </tr>
      <tr>
        <td>ELK Stack</td>
        <td>Logging and Analytics</td>
      </tr>
    </table>
  </body>
  </html>
  `;
  res.send(html);
});

if (process.argv[1] === new URL(import.meta.url).pathname) {
  app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
  });
}

export default app;
