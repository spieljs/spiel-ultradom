import { assert, expect } from "chai";
import { change, ultraBuilder} from "../../src";

import { configDefault, configSettings } from "./configs";
import { testPage1 } from "./mocks/TestPage1";
import { testPage2 } from "./mocks/TestPage2";
import { testPage4 } from "./mocks/TestPage4";

describe("Router", () => {
  describe("with default", () => {
    before(() => {
      ultraBuilder.setRouter(configDefault).resolve();
    });

    it("has to go to '#/' without default path", (done) => {
      setTimeout(() => {
        expect(window.location.hash).has.to.be.equal("#/");
        done();
      });
    });

    it("has to create the component testPage1", () => {
      const element = document.getElementsByTagName("h1")[0];
      expect(element.textContent).has.to.be.equal("Hello world");
    });

    it("has to go to child page", (done) => {
      const button = document.getElementById("page-component");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        expect(window.location.hash).has.to.be.equal("#/child");
        expect(title).has.not.to.be.equals("Hello world");
        done();
      });
    });

    it("has to create the page child and its components", () => {
      const child = document.getElementById("child");
      if (child) {
        const component = child.getElementsByTagName("span")[0];
        if (component) { expect(component.textContent).has.to.be.equal("And this is its child");
      } else { throw new Error("The child component wasn't created"); }
      } else {
        throw new Error("The component wasn't created");
      }
    });

    it("has to go to parent page", (done) => {
      const button = document.getElementById("go-parent");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        expect(window.location.hash).has.to.be.equal("#/");
        done();
      });
    });

    after(() => {
      ultraBuilder.router.destroy();
      window.location.hash = "";
    });
  });

  describe("with settings", () => {
    before(() => {
      ultraBuilder.setRouter(configSettings).resolve();
    });

    it("has to go to home page", (done) => {
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        expect(window.location.hash).has.to.be.equal("#!/home");
        expect(title.textContent).has.to.be.equal("Hello world");
        expect(defaultProps.textContent).has.to.be.equal("default");
        done();
      });
    });

    it("has to works the generic hooks and page hooks", (done) => {
      const button = document.getElementById("child");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        if (title) {
          expect(title.textContent).has.to.be.equal("Seriously 9");
        }
        expect(defaultProps.textContent).has.to.be.equal("default");
        done();
      });
    });

    it("has to go to root page from testpage3", (done) => {
      const button = document.getElementsByTagName("button")[0];
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        expect(window.location.hash).has.to.be.equal("#!/home");
        expect(title.textContent).has.to.be.equal("Hello world");
        expect(defaultProps.textContent).has.to.be.equal("default");
        done();
      });
    });

    it("has to get two parameters", (done) => {
      const button = document.getElementById("grandchild");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        expect(title.textContent).has.to.be.equal("Really test 4 query=really good");
        expect(defaultProps.textContent).has.to.be.equal("default");
        ultraBuilder.go("/home");
        done();
      });
    });

    it("has to go to brother page", (done) => {
      const button = document.getElementById("brother");
      if (button) {
        button.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        const defaultProps = document.getElementsByTagName("h2")[0];
        ultraBuilder.router.updatePageLinks();
        expect(title.textContent).has.to.be.equal("Hello brother");
        expect(defaultProps.textContent).has.to.be.equal("my own prop");
        done();
      });
    });

    it("has to change the title in brother page", () => {
      const button = document.getElementsByTagName("button")[0];
      if (button) {
        button.click();
      }
      const title = document.getElementsByTagName("h1")[0];
      expect(title.textContent).has.to.be.equal("Yes brother");
    });

    it("has to get the home link when getLinkPath is called", () => {
      const link = document.getElementsByTagName("a")[0];
      const url = ultraBuilder.router.getLinkPath(link);
      expect(url).has.to.be.equal("/home");
    });

    it("has to go to root page from testpage4", (done) => {
      const link = document.getElementsByTagName("a")[0];
      if (link) {
        link.click();
      }
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        expect(window.location.hash).has.to.be.equal("#!/home");
        expect(title.textContent).has.to.be.equal("Hello world");
        done();
      });
    });

    it("has to go to not found page", (done) => {
      ultraBuilder.go("/home/chil");
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        expect(window.location.hash).has.to.be.equal("#!/not-found");
        expect(title.textContent).has.to.be.equal("Page not found sorry");
        done();
      }, 100);
    });

    after(() => {
      ultraBuilder.router.destroy();
      window.location.hash = "";
    });
  });

  describe("without hash", () => {
    before(() => {
      configSettings.useHash = false;
      ultraBuilder.setRouter(configSettings).resolve();
      ultraBuilder.go("/");
    });

    it("has not to have any hash", (done) => {
      setTimeout(() => {
        expect(window.location.hash).has.to.be.empty;
        done();
      });
    });

    it("has to go to default page", () => {
      const title = document.getElementsByTagName("h1")[0];
      expect(window.location.pathname).has.to.be.equal("/home");
      expect(title.textContent).has.to.be.equal("Hello world");
    });

    after(() => {
      ultraBuilder.router.destroy();
    });
  });

  describe("manual", () => {
    before(() => {
      ultraBuilder.setRouter({ rootPath: "http://localhost:9876/" });
    });

    it("has to add a route", (done) => {
      ultraBuilder.router.on("/child/:number", (params) => {
        const state: {params: any} = { params: {}};
        Object.assign(state, testPage2.state);
        state.params = params;
        change(testPage2.view, state);
      });
      ultraBuilder.resolve();
      ultraBuilder.go("/child/6");
      setTimeout(() => {
        const title = document.getElementsByTagName("h1")[0];
        if (title) {
          expect(title.textContent).has.to.be.equal("Seriously 6");
        }
        done();
      });
    });

    it("has to create a default route", (done) => {
      ultraBuilder.router.pause();
      ultraBuilder.router.on(() => {
        document.body.appendChild(change(testPage1.view, testPage1.state));
      });
      ultraBuilder.router.resume();
      ultraBuilder.resolve();
      ultraBuilder.go("http://localhost:9876/", null, true);
      setTimeout(() => {
        const element = document.getElementsByTagName("h1")[0];
        expect(element.textContent).has.to.be.equal("Hello world");
        done();
      }, 100);
    });

    it("has to get the full link", () => {
      expect(ultraBuilder.router.link("/")).has.to.be.equal("http://localhost:9876/#/");
    });

    it("has to get the last route resolved", (done) => {
      ultraBuilder.go("/child/5");
      setTimeout(() => {
        expect(ultraBuilder.router.lastRouteResolved().url).has.to.be.equal("/child/5");
        done();
      });
    });

    it("has to generate an url", (done) => {
      ultraBuilder.router.on({
        "/child/:number": {
          as: "child", uses: (params, query) => {
            Object.assign(testPage2.state, params);
            change(testPage2.view, testPage2.state);
          },
        },
      });

      setTimeout(() => {
        const path = ultraBuilder.router.generate("child", { number: 5 });
        expect(path).has.to.be.equal("#/child/5");
        done();
      });
    });
  });
});
