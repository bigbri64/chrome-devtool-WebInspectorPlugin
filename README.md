# chrome-devtool-WebInspectorPlugin
Tools for saving workspace and source files exported from the WebInspector runtime.

---
##### version-0-1-0 #####

**Updates**

**Added command option handlers:**

***save-create-dir-list:*** ``generates script file containing commands to create folder structure that maps to the site source directory hierarchy,``

***save-move-file-list:*** ``generates script file containing commands to move saved files from the current working director to the corresponding site source file path hierarchy,``

***save-all-urls:*** ``generates a file containing a list of all urls within the context of the web-inspector workspace session,``

***save-valid-urls:*** ``generates a file containing a list of all valid urls (using basic validation rules) within the context of the web-inspector workspace session,``

***save-resources:*** ``executes file download commands for all resource urls (non script resources) within the context of the web-inspector workspace session,``

***save-source-files:*** ``executes file download commands for all source urls (text, and script resources) within the context of the web-inspector workspace session,``

````
 - save-create-dir-list: generates script file containing commands to create folder structure that maps to the site source directory hierarchy,
 - save-move-file-list: generates script file containing commands to move saved files from the current working director to the corresponding site source file path hierarchy,
 - save-all-urls: generates a file containing a list of all urls within the context of the web-inspector workspace session,
 - save-valid-urls: generates a file containing a list of all valid urls (using basic validation rules) within the context of the web-inspector workspace session,
 - save-resources: executes file download commands for all resource urls (non script resources) within the context of the web-inspector workspace session,
 - save-source-files: executes file download commands for all source urls (text, and script resources) within the context of the web-inspector workspace session,
````

---
##### version-0-2-0 #####

**Updates**

``
Added command option utility helper classes for loading/managing plugin options.
``

``
Added command option handler "save-curl-command-file-list" for generating and exporting a script file containing curl download command statements for each workspace file (remote site source).
``
---
### WebInspectorPlugin: Chrome DevTool Extension Toolset on GitHub
The following repositories provide additional information and resources:
#### [chrome-devtool-WebInspectorPlugin](https://github.com/bigbri64/chrome-devtool-WebInspectorPlugin "chrome-devtool-WebInspectorPlugin")
#### [chrome-devtool-resources](https://github.com/bigbri64/chrome-devtool-resources "chrome-devtool-resources")
#### [chrome-devtool-tools](https://github.com/bigbri64/chrome-devtool-tools "chrome-devtool-tools")
