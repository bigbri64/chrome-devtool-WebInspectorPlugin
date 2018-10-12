/**
 * ChromeConsolePlugin.saveUrlContent
 * @author bigbri64
 * @type {{saveUrlContent: Window.ChromeConsolePlugin.saveUrlContent}}
 */
window.ChromeConsolePlugin = {

  /** */
  installConsoleSaveSupport : function () {

    var _PLUGIN_ = this;

    (function (console) {

      console.save = function (data, filename) {
        if (!data) {
          console.error('Console.save: No data');
          return;
        }

        if (!filename) {
          filename = 'console.json'
        }

        if (typeof data === "object") {
          data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type : 'text/json'}),
          e = document.createEvent('MouseEvents'),
          a = document.createElement('a');

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e)
      }
    })(console);
  },

  /**
   * @param defaultOptions
   */
  initPlugin : function (defaultOptions) {

    var _PLUGIN_ = this;
    _PLUGIN_.installConsoleSaveSupport();
  },

  /**
   * @param defaultOptions
   */
  runPlugin : function (defaultOptions) {

    var _PLUGIN_ = this;

    this.initPlugin(defaultOptions);

    this.saveUrlContent();
  },

  /**
   * @private
   */
  saveUrlContent : function () {

    var _PLUGIN_ = this;

    Array.from(document.querySelectorAll('body')).map(function (_body) {
        return (_body.textContent.replace(/^\/\//ig, 'http:\/\/'));
      })
      .forEach(function (href) {
        window.fetch(href).then(async function (response) {
          var fileName = href.replace(/^(.*)(jsmod.*)$/ig, "$2.js");
          //var fileName = href.replace(/(^.*)\/([^\/]+\\,)(jsmod.*$)/ig, '$3.js')
          var responseText = await response.text();
          var responseData = await responseText;
          console.log(responseData);
          console.save(responseData, fileName);
        })
      });
  }

};

/** @type {ChromeConsolePlugin} */
ChromeConsolePlugin.runPlugin();

delete window.ChromeConsolePlugin;
