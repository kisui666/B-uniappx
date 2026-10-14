(function(vue) {
  "use strict";
  function currentPageCaptureScreenshot(fullPage, callback) {
    var _a;
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    (_a = currentPage.vm) === null || _a === void 0 ? void 0 : _a.$viewToTempFilePath({
      wholeContent: fullPage,
      overwrite: true,
      success: (res) => {
        const fileManager = uni.getFileSystemManager();
        fileManager.readFile({
          encoding: "base64",
          filePath: res.tempFilePath,
          success(readFileRes) {
            callback(readFileRes.data, "");
          },
          fail(err) {
            callback("", `captureScreenshot fail: ${JSON.stringify(err)}`);
          }
        });
      },
      fail: (err) => {
        callback("", `captureScreenshot fail: ${JSON.stringify(err)}`);
      }
    });
  }
  function initRuntimeSocket(hosts, port, id) {
    if (hosts == "" || port == "" || id == "")
      return Promise.resolve(null);
    return hosts.split(",").reduce((promise, host) => {
      return promise.then((socket) => {
        if (socket != null)
          return Promise.resolve(socket);
        return tryConnectSocket(host, port, id);
      });
    }, Promise.resolve(null));
  }
  const SOCKET_TIMEOUT = 500;
  function tryConnectSocket(host, port, id) {
    return new Promise((resolve, reject) => {
      const socket = uni.connectSocket({
        url: `ws://${host}:${port}/${id}`,
        fail() {
          resolve(null);
        }
      });
      const timer = setTimeout(() => {
        socket.close({
          code: 1006,
          reason: "connect timeout"
        });
        resolve(null);
      }, SOCKET_TIMEOUT);
      socket.onOpen((e) => {
        clearTimeout(timer);
        resolve(socket);
      });
      socket.onClose((e) => {
        clearTimeout(timer);
        resolve(null);
      });
      socket.onError((e) => {
        clearTimeout(timer);
        resolve(null);
      });
      socket.onMessage((result) => {
        if (typeof result["data"] == "string") {
          const message = JSON.parse(result["data"]);
          if (message["type"] == "screencap") {
            const id2 = message["id"];
            currentPageCaptureScreenshot(message["fullPage"], (base64, error) => {
              socket.send({
                data: JSON.stringify({
                  id: id2,
                  base64,
                  error
                })
              });
            });
          }
        }
        resolve(null);
      });
    });
  }
  function initRuntimeSocketService() {
    const hosts = "26.171.156.185,10.69.109.178,127.0.0.1";
    const port = "8090";
    const id = "app-android_WOmDnI";
    return Promise.resolve().then(() => {
      return initRuntimeSocket(hosts, port, id).then((socket) => {
        if (socket == null) {
          return false;
        }
        return true;
      });
    }).catch(() => {
      return false;
    });
  }
  initRuntimeSocketService();
  const __className$2 = "GenPagesIndexIndex";
  const _sfc_main$3 = /* @__PURE__ */ vue.defineVaporSharedDataComponent({
    __dynamicSharedData: true,
    __hash: "01768280",
    __className: __className$2,
    __filename: "pages/index/index.uvue",
    __name: "index",
    setup(__props) {
      const __sharedDataRenderer = vue.useSharedDataRenderer();
      const __sharedData = __sharedDataRenderer == "component" ? vue.withSharedDataComponent(new UniDynamicSharedDataComponent(vue.useSharedDataScope(), vue.useSharedDataComponentOptions({ bundleKey: "GenPagesIndexIndexSharedData", sharedDataClassId: 0 }))) : vue.withSharedDataPage(new UniDynamicSharedDataPage(vue.useSharedDataPageId(), vue.useSharedDataPageOptions({ bundleKey: "GenPagesIndexIndexSharedData", sharedDataClassId: 0 })));
      vue.useSharedDataScope(__sharedData);
      const goAbout2 = () => {
        uni.navigateTo({ url: "/pages/aboutme/aboutme" });
      };
      return () => {
        "raw js";
        vue.setSharedDataEvent(__sharedData, 0, goAbout2);
        return __sharedData;
      };
    }
  });
  const _style_0$2 = {};
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["styles", [_style_0$2]]]);
  const __className$1 = "GenPagesAboutmeAboutme";
  const _sfc_main$2 = /* @__PURE__ */ vue.defineVaporSharedDataComponent({
    __dynamicSharedData: true,
    __hash: "20249cfd",
    __className: __className$1,
    __filename: "pages/aboutme/aboutme.uvue",
    __name: "aboutme",
    setup(__props) {
      const __sharedDataRenderer = vue.useSharedDataRenderer();
      const __sharedData = __sharedDataRenderer == "component" ? vue.withSharedDataComponent(new UniDynamicSharedDataComponent(vue.useSharedDataScope(), vue.useSharedDataComponentOptions({ bundleKey: "GenPagesAboutmeAboutmeSharedData", sharedDataClassId: 0 }))) : vue.withSharedDataPage(new UniDynamicSharedDataPage(vue.useSharedDataPageId(), vue.useSharedDataPageOptions({ bundleKey: "GenPagesAboutmeAboutmeSharedData", sharedDataClassId: 0 })));
      vue.useSharedDataScope(__sharedData);
      return () => {
        "raw js";
        vue.setSharedDataEvent(__sharedData, 0, (e) => {
          return goAbout(e);
        });
        return __sharedData;
      };
    }
  });
  const _style_0$1 = {};
  const PagesAboutmeAboutme = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["styles", [_style_0$1]]]);
  const __className = "GenPagesEditEdit";
  const _sfc_main$1 = /* @__PURE__ */ vue.defineVaporSharedDataComponent({
    __dynamicSharedData: true,
    __hash: "72be7de0",
    __className,
    __filename: "pages/edit/edit.uvue",
    __name: "edit",
    setup(__props) {
      const __sharedDataRenderer = vue.useSharedDataRenderer();
      const __sharedData = __sharedDataRenderer == "component" ? vue.withSharedDataComponent(new UniDynamicSharedDataComponent(vue.useSharedDataScope(), vue.useSharedDataComponentOptions({ bundleKey: "GenPagesEditEditSharedData", sharedDataClassId: 0 }))) : vue.withSharedDataPage(new UniDynamicSharedDataPage(vue.useSharedDataPageId(), vue.useSharedDataPageOptions({ bundleKey: "GenPagesEditEditSharedData", sharedDataClassId: 0 })));
      vue.useSharedDataScope(__sharedData);
      return () => {
        "raw js";
        return __sharedData;
      };
    }
  });
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/aboutme/aboutme", PagesAboutmeAboutme);
  __definePage("pages/edit/edit", _sfc_main$1);
  const _sfc_main = /* @__PURE__ */ vue.defineVaporSharedDataComponent({
    __name: "App",
    setup(__props) {
      let firstBackTime = 0;
      vue.onLaunch(() => {
        uni.__log__("log", "at App.uvue:7", "App Launch");
      });
      vue.onAppShow(() => {
        uni.__log__("log", "at App.uvue:11", "App Show");
      });
      vue.onAppHide(() => {
        uni.__log__("log", "at App.uvue:15", "App Hide");
      });
      vue.onLastPageBackPress(() => {
        uni.__log__("log", "at App.uvue:20", "App LastPageBackPress");
        if (firstBackTime == 0) {
          uni.showToast({
            title: "再按一次退出应用",
            position: "bottom"
          });
          firstBackTime = Date.now();
          setTimeout(() => {
            firstBackTime = 0;
          }, 2e3);
        } else if (Date.now() - firstBackTime < 2e3) {
          firstBackTime = Date.now();
          uni.exit();
        }
      });
      vue.onExit(() => {
        uni.__log__("log", "at App.uvue:37", "App Exit");
      });
    }
  });
  const _style_0 = {};
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["styles", [_style_0]]]);
  const __global__ = typeof globalThis === "undefined" ? Function("return this")() : globalThis;
  __global__.__uniX = true;
  function createApp() {
    const app = vue.createSSRApp(App);
    return {
      app
    };
  }
  createApp().app.mount("#app");
})(Vue);
//# sourceMappingURL=file:///C:/Users/19914/Desktop/%E6%96%B0%E5%BB%BA%E6%96%87%E4%BB%B6%E5%A4%B9%20(6)/newapp/unpackage/cache/vapor/.app-android/sourcemap/app-service.js.map
