import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

describe("GET /", () => {
  it("should return status 200 and contain the correct title", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include(
          "<title>DevOps Pipeline with Jenkins for NodeJS application</title>"
        );
        done();
      });
  });

  it("should display a table with a list of DevOps tools", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const tools = [
          "Jenkins",
          "Docker",
          "Kubernetes",
          "Git",
          "Ansible",
          "Terraform",
          "Prometheus",
          "Grafana",
          "ELK Stack",
        ];
        tools.forEach((tool) => {
          expect(res.text).to.include(`<td>${tool}</td>`);
        });
        done();
      });
  });
});
