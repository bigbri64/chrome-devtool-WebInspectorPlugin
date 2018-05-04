/**
 * WebInspectorPlugin.saveWorkspace
 * @author big bri
 * @type {{saveWorkspace: Window.WebInspectorPlugin.saveWorkspace}}
 */
window.WebInspectorPlugin = {

    initOptions : function (defaultOptions) {


        var _PLUGIN_getOption = function (_options, optionName, defaultOptionValue) {
            // WebInspectorPlugin._COMMAND_OPTIONS_
            // defaultOptionValue = (typeof defaultOptionValue == "undefined") ? false : defaultOptionValue;
            /** @type {CommandOption} */
            var optionValue = _options.hasOwnProperty(optionName) ? _options[optionName] : defaultOptionValue;

            return optionValue.value;
        };
        var _PLUGIN_setOption = function (_options, optionName, optionValue) {
            // WebInspectorPlugin._COMMAND_OPTIONS_
            _options[optionName] = optionValue;
        };

        /**
         * @param optionName {String}
         * @param optionValue {Object}
         * @constructor
         */
        function CommandOption(optionName, optionValue) {
            /** @type {String} */
            this.name = optionName;
            /** @type {String} */
            this.key = optionName;
            /** @type {Object} */
            this.value = optionValue;
        }

        /**
         * @returns {Object}
         */
        CommandOption.prototype.getOption = function () {
            return this.value;
        };

        /**
         * @param _value {Object}
         * @returns {Object}
         */
        CommandOption.prototype.setOption = function (_value) {
            var previousValue = this.value;
            this.value = _value;
            // return previousValue;
            return this.value;
        };

        /**
         * @returns {string}
         */
        CommandOption.prototype.toString = function () {
            // var _template = 'option { name: \'_NAME_\', value: \'_VALUE_\' }';
            var _template = '\'_NAME_\': _VALUE_';
            var _message = _template
                .replace(/_NAME_/g, this.name)
                .replace(/_VALUE_/g, this.value);
            return _message;
        };

        /**
         * @param options
         * @param defaultOptions
         * @constructor
         */
        function CommandOptionSet(options, defaultOptions) {
            /** @type {[]<CommandOption>} */
            this.options = (typeof options === "undefined") ? {} : options;
            this.updateOptions(defaultOptions);
        }

        /**
         * @param optionName
         * @param defaultOptionValue
         */
        CommandOptionSet.prototype.getOption = function (optionName, defaultOptionValue) {
            return _PLUGIN_getOption(this.options, optionName, defaultOptionValue);
        };

        /**
         * @param optionName
         * @param optionValue
         */
        CommandOptionSet.prototype.setOption = function (optionName, optionValue) {
            return _PLUGIN_setOption(this.options, optionName, optionValue);
        };

        /**
         * @param defaultOptions
         * @returns {CommandOptionSet}
         */
        CommandOptionSet.prototype.updateOptions = function (defaultOptions) {
            defaultOptions = defaultOptions || {};
            for (var optionName in defaultOptions) {
                if ((optionName !== null) && defaultOptions.hasOwnProperty(optionName)) {
                    var optionValue = defaultOptions[optionName];
                    this.setOption(optionName, optionValue);
                }
            }
        };

        /**
         * @param optionName
         * @param optionValue
         * @returns {CommandOption}
         */
        CommandOptionSet.prototype.addOption = function (optionName, optionValue) {

            // var _options = WebInspectorPlugin._OPTIONS_;

            // var _option = {
            //     name: optionName,
            //     key: optionName,
            //     value: optionValue,
            //     getOption : function() {
            //         return getOption(WebInspectorPlugin._OPTIONS_, this.key, this.value);
            //     },
            //     setOption : function(_value) {
            //         return setOption(WebInspectorPlugin._OPTIONS_, this.key, _value);
            //     }
            // };

            var _option = new CommandOption(optionName, optionValue);

            this.options[_option.name] = _option;

            return _option;
        };

        /**
         * @returns {*[].<CommandOption>}
         */
        CommandOptionSet.prototype.listOptions = function () {
            /** @type {[]<CommandOption>} */
            var _optionList = [];
            for (var optionName in this.options) {
                if (this.options.hasOwnProperty(optionName)) {
                    var optionValue = this.options[optionName];
                    _optionList.push(optionValue.toString());
                }
            }
            return _optionList;
        };

        /**
         * @returns {string}
         */
        CommandOptionSet.prototype.toString = function () {
            // var _template = 'option { name: \'_NAME_\', value: \'_VALUE_\' }';
            var _template = 'OptionSet {\n_OPTION_LIST_\n}';
            var _message = _template
                .replace(/_OPTION_LIST_/g, this.listOptions().join('\n'))
            return _message;
        };

        /**
         * @param pluginOptions
         * @param defaultOptions
         * @constructor
         */
        function WebInspectorPluginOptionSet(pluginOptions, defaultOptions) {
            /** @type {Object} */
            this.options = (typeof pluginOptions === "undefined") ? WebInspectorPlugin._OPTIONS_ : pluginOptions;
            /** @type {CommandOptionSet} */
            this.optionSet = new CommandOptionSet(this.options);

            this.initOptions();
            this.updateOptions(defaultOptions);

            console.log('OPTIONS:\n_OPTIONS_\n'.replace(/_OPTIONS_/g, this.optionSet.toString()));
        }

        /**
         * @returns {CommandOptionSet}
         */
        WebInspectorPluginOptionSet.prototype.initOptions = function () {

            this.optionSet.addOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_create_dir_list, true);
            this.optionSet.addOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_move_file_list, true);
            this.optionSet.addOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_curl_command_file_list, true);
            this.optionSet.addOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_all_urls, false);
            this.optionSet.addOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_valid_urls, true);
            this.optionSet.addOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_resources, true);
            this.optionSet.addOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_source_files, true);

            this.optionSet.addOption(WebInspectorPlugin._PLUGIN_OPTIONS_.inspectedPageDomain, null);
            this.optionSet.addOption(WebInspectorPlugin._PLUGIN_OPTIONS_.verbose, true);
            this.optionSet.addOption(WebInspectorPlugin._PLUGIN_OPTIONS_.skipInvalidFiles, true);

            return this.optionSet;
        };
        /**
         * @param defaultOptions
         * @returns {CommandOptionSet}
         */
        WebInspectorPluginOptionSet.prototype.updateOptions = function (defaultOptions) {

            defaultOptions = defaultOptions || {};
            this.optionSet.updateOptions(defaultOptions);

            console.log('UPDATE OPTIONS:\n_OPTIONS_\n'.replace(/_OPTIONS_/g, this.optionSet.toString()));

            return this.optionSet;
        };

        /**
         * @param optionName
         * @param defaultOptionValue
         * @return {Object}
         */
        WebInspectorPluginOptionSet.prototype.getOption = function (optionName, defaultOptionValue) {
            return this.optionSet.getOption(optionName, defaultOptionValue);
        };
        /**
         * @param optionName
         * @param optionValue
         * @return {Object}
         */
        WebInspectorPluginOptionSet.prototype.setOption = function (optionName, optionValue) {
            return this.optionSet.setOption(optionName, optionValue);
        };


        WebInspectorPlugin._COMMAND_OPTIONS_ = {
            save_create_dir_list : 'save-create-dir-list',
            save_move_file_list : 'save-move-file-list',
            save_curl_command_file_list : 'save-curl-command-file-list',
            save_all_urls : 'save-all-urls',
            save_valid_urls : 'save-valid-urls',
            save_resources : 'save-resources',
            save_source_files : 'save-source-files'
        };
        WebInspectorPlugin._PLUGIN_OPTIONS_ = {
            inspectedPageDomain : 'inspectedPageDomain',
            verbose : 'verbose',
            skipInvalidFiles : 'skipInvalidFiles'
        };

        // WebInspectorPlugin._OPTIONS_ = {
        //     'save-create-dir-list' : true,
        //     'save-move-file-list' : true,
        //     'save-curl-command-file-list' : true,
        //     'save-all-urls' : false,
        //     'save-valid-urls' : true,
        //     'save-resources' : true,
        //     'save-source-files' : true
        // };

        /** @type {Object} */
        WebInspectorPlugin._OPTIONS_ = {};
        /** @type {WebInspectorPluginOptionSet} */
        WebInspectorPlugin._OPTION_SET_ = new WebInspectorPluginOptionSet(WebInspectorPlugin._OPTIONS_, defaultOptions);
        WebInspectorPlugin._OPTION_SET_.updateOptions(defaultOptions);

        WebInspectorPlugin._USE_WINDOWS_END_OF_LINE_ = true;
        WebInspectorPlugin._ABORT_ = false;
        WebInspectorPlugin._QUIET_MODE_ = false;
    },

    /**
     * @param optionName
     * @returns {boolean}
     */
    hasOption : function (optionName) {
        /** @type {WebInspectorPluginOptionSet} */
        var _optionSet = WebInspectorPlugin._OPTION_SET_;
        return _optionSet.options.hasOwnProperty(optionName);
    },
    /**
     * @param optionName
     * @return {Object}
     */
    getOption : function (optionName) {
        /** @type {WebInspectorPluginOptionSet} */
        var _optionSet = WebInspectorPlugin._OPTION_SET_;
        return _optionSet.getOption(optionName);
    },
    /**
     * @param optionName
     * @param optionValue
     * @return {Object}
     */
    setOption : function (optionName, optionValue) {
        /** @type {WebInspectorPluginOptionSet} */
        var _optionSet = WebInspectorPlugin._OPTION_SET_;
        return _optionSet.setOption(optionName, optionValue);
    },

    /**
     * @param defaultOptions
     */
    initPlugin : function (defaultOptions) {

        var _PLUGIN_ = this;

        // WebInspectorPlugin.hasOption = function (optionName) {
        //     /** @type {WebInspectorPluginOptionSet} */
        //     var _optionSet = WebInspectorPlugin._OPTION_SET_;
        //     return _optionSet.options.hasOwnProperty(optionName);
        // };
        // WebInspectorPlugin.getOption = function (optionName) {
        //     /** @type {WebInspectorPluginOptionSet} */
        //     var _optionSet = WebInspectorPlugin._OPTION_SET_;
        //     _optionSet.getOption(optionName);
        // };
        // WebInspectorPlugin.setOption = function (optionName, optionValue) {
        //     /** @type {WebInspectorPluginOptionSet} */
        //     var _optionSet = WebInspectorPlugin._OPTION_SET_;
        //     _optionSet.setOption(optionName, optionValue);
        // };

        _PLUGIN_.initOptions(defaultOptions);
    },

    /**
     * @param defaultOptions
     */
    runPlugin : function (defaultOptions) {

        var _PLUGIN_ = this;

        this.initPlugin(defaultOptions);

        this._saveWorkspace();
    },

    /**
     * @private
     */
    _saveWorkspace : function () {

        var _PLUGIN_ = this;

        /**
         * @type {FileInfo}
         * @constructor
         */
        function FileInfo() {
            /** @type {boolean} */
            this.isValid = false;
            /** @type {string} */
            this.contentURL = '';
            this.workingCopy = undefined;
            /** @type {function} */
            this.requestContent = undefined;
            /** @type {string} */
            this.fullPath = '';
            /** @type {string} */
            this.filePath = '';
            /** @type {string} */
            this.fileName = '';
            /** @type {string} */
            this.storedFileName = '';
        }

        /**
         * @type {RequestInfo}
         * @constructor
         */
        function RequestInfo() {
            /** @type {boolean} */
            this.isValid = false;
            /** @type {string} */
            this.url = '';
            /** @type {string} */
            this.documentURL = '';
            /** @type {string} */
            this.requestFormData = '';
            /** @type {string} */
            this.content = '';
        }

        var getPageURL = function () {
            //var _pageDomain_ = WebInspector.inspectedPageDomain;
            //WebInspector.workspace.projectsForType(WebInspector.projectTypes.Network)
            var _pageDomain_ = '_web_url_';
            try {
                var inspectedPageDomain = _PLUGIN_.getOption('inspectedPageDomain');
                if (!inspectedPageDomain) {
                    /** @type {Array} */
                        //var _projects = WebInspector.workspace.projectsForType(WebInspector.projectTypes.Network);
                    var _projects = Workspace.workspace.projectsForType(Workspace.projectTypes.Network);
                    //var _sourceCodeList = _projects[0]._uiSourceCodesList;
                    //var lastIndex = _projects.length - 1;
                    var _sourceCodeList = _projects[_projects.length - 1].uiSourceCodes();
                    inspectedPageDomain = _sourceCodeList[0]._origin;
                    _PLUGIN_.setOption('inspectedPageDomain', inspectedPageDomain);
                    console.log('inspectedPageDomain = ' + inspectedPageDomain);
                }
                _pageDomain_ = inspectedPageDomain;
            }
            catch (error) {
                console.log(error);
                debugger;
            }
            return _pageDomain_;
        };

        var showPanel = function (name) {
            try {
                if (name === 'sources') {
                    //WebInspector.inspectorView.setCurrentPanel(WebInspector.panels.sources);
                    UI.viewManager.showView('sources');
                }
                else if (name === 'resources') {
                    //WebInspector.inspectorView.setCurrentPanel(WebInspector.panels.resources);
                    UI.viewManager.showView('resources');
                }
            }
            catch (error) {
                console.log(error);
            }
        };

        var toFileURL = function (path) {
            //return path.toLowerCase().replace(/\//g, '\\').replace(/:/g, '-');
            return path.replace(/\//g, '\\').replace(/:/g, '-');
        };

        /**
         * @param content
         * @returns {FileInfo}
         */
        var getFileInfo = function (content) {
            if (content instanceof FileInfo) {
                return content;
            }

            var contentURL = (typeof content === 'string') ? content : ((!!content.contentURL) ? content.contentURL : content);
            if (typeof contentURL === 'function') {
                contentURL = contentURL.call(content);
            }
            var workingCopy = ((!!content.workingCopy) ? content.workingCopy : undefined);
            if (typeof workingCopy === 'function') {
                workingCopy = workingCopy.call(content);
            }
            var requestContent = (function (_reference) {
                return function (_callback) {
                    //_reference = content;
                    if ('requestContent' in _reference) {

//                        _reference.requestContent(_callback);
                        _reference.requestContent.call(_reference, _callback);

                    }
                };
            })(content);

            if (typeof workingCopy === 'function') {
                workingCopy = workingCopy.call(content);
            }

            //var parsedURL = new WebInspector.ParsedURL(contentURL);
            var parsedURL = new Common.ParsedURL(contentURL);
            var filePath = toFileURL(parsedURL.host) + toFileURL(parsedURL.folderPathComponents);
            // + parsedURL.displayName;
            filePath = toFileURL(filePath);

            //WebInspector.inspectedPageDomain
            //WebInspector.inspectedPageURL

            //var displayName = WebInspector.displayNameForURL(contentURL);
            var fileName = toFileURL(parsedURL.lastPathComponent);
            fileName = fileName ? fileName : toFileURL(parsedURL.displayName);

            var fullPath = filePath + '\\' + fileName;

            /** @type {FileInfo} */
            var fileInfo = new FileInfo();
            fileInfo.isValid = parsedURL.isValid && isValidURL(contentURL);
            fileInfo.contentURL = contentURL;
            fileInfo.workingCopy = workingCopy;
            fileInfo.requestContent = requestContent;
            fileInfo.fullPath = fullPath;
            fileInfo.filePath = filePath;
            fileInfo.fileName = fileName;
            fileInfo.storedFileName = fileName;

            return fileInfo;
        };

        ///////////////////////////////////////////////////////////////////////////////
        // network request list helpers
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @param requestList {Array<SDK.NetworkRequest>}
         * @param filter
         * @returns {Array<RequestInfo>}
         */
        var getNetworkRequestInfoList = function (requestList, filter) {

            var requestInfoList = Array.prototype.map.call(requestList, function (_request) {
                //
                // SDK.NetworkRequest
                //var _request = this._request;
                var _request_info = new RequestInfo();
                _request_info.url = _request._url;
                _request_info.documentURL = _request._documentURL;
                _request_info.requestFormData = _request._requestFormData;
                _request_info.content = _request._content;
                return _request_info;
            });
            if (!!filter) {
                requestInfoList = requestInfoList.filter(filter);
            }
            return requestInfoList;
        };

        ///////////////////////////////////////////////////////////////////////////////
        // source code url list helpers
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @param sourceCodeList {Array<WebInspector.UISourceCode>}
         * @param filter
         * @returns {Array<FileInfo>}
         */
        var getFileInfoList = function (sourceCodeList, filter) {
            showPanel("sources");
            var _files = [];
            var _fileNameCollisionMap = {};
            for (var i = 0; i < sourceCodeList.length; i++) {
                var sourceCode = sourceCodeList[i];
                var fileInfo = getFileInfo(sourceCode);
                if (filter && !filter(fileInfo.contentURL)) {
                    continue;
                }

                if (_fileNameCollisionMap.hasOwnProperty(fileInfo.storedFileName)) {
                    var offset = _fileNameCollisionMap[fileInfo.storedFileName];
                    offset = offset + 1;
                    _fileNameCollisionMap[fileInfo.storedFileName] = offset;

                    fileInfo.storedFileName = ('_' + offset + '_') + fileInfo.storedFileName;

                    console.log('*** File name collision:' + '\n' +
                        ' fileName: ' + fileInfo.fileName + '\n' +
                        ' storedFileName: ' + fileInfo.storedFileName);

                }
                else {
                    _fileNameCollisionMap[fileInfo.storedFileName] = 1;
                }

                _files.push(fileInfo);
            }
            return _files;
        };
        ///////////////////////////////////////////////////////////////////////////////
        var getResourceFileList = function (filter) {
            showPanel("resources");
            //document.querySelectorAll('.panel.resources');
            var resourceNodeList = document.querySelectorAll('li[class*="resources-type-"]');
            var _resources = [];
            for (var i = 0; i < resourceNodeList.length; i++) {
                var resourceNode = resourceNodeList[i];
                if (filter && !filter(resourceNode.title)) {
                    continue;
                }
                if (_resources.indexOf(resourceNode.title) >= 0) {
                    continue;
                }
                _resources.push(resourceNode.title);
            }
            return _resources;
        };
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @param dataList
         * @param propertyName
         * @param filter
         * @returns {Array}
         */
        var getValuesByPropertyName = function (dataList, propertyName, filter) {
            var _delegate_ = {
                getPropertyValue : function (data) {
                    var propertyValue = data;
                    if (typeof propertyName === 'string') {
                        propertyValue = (propertyName in data) ? data[propertyName] : data;
                    }
                    else if (typeof propertyName === 'function') {
                        propertyValue = propertyName(data);
                    }
                    return propertyValue;
                }
            };
            var _propertyList = [];
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                var propertyValue = _delegate_.getPropertyValue(data);
                if (filter && !filter(data)) {
                    continue;
                }
                if (_propertyList.indexOf(propertyValue) >= 0) {
                    continue;
                }
                _propertyList.push(propertyValue);
            }
            return _propertyList;
        };

        /**
         * @param sourceFileList {Array<FileInfo>}
         * @param filter
         * @returns {Array}
         */
        var getSourceCodeURLs = function (sourceFileList, filter) {
            var _urls = getValuesByPropertyName(sourceFileList, 'contentURL', filter);
            return _urls;
        };
        /**
         * @param sourceFileList {Array<FileInfo>}
         * @param filter
         * @returns {Array}
         */
        var getSourceCodeDirectoryList = function (sourceFileList, filter) {
            var _directories = getValuesByPropertyName(sourceFileList, 'filePath', filter);
            return _directories;
        };
        /**
         * @param sourceFileList {Array<FileInfo>}
         * @param filter
         * @returns {Array}
         */
        var getSourceCodeFileList = function (sourceFileList, filter) {
            var _files = getValuesByPropertyName(sourceFileList, 'fullPath', filter);
            return _files;
        };

        ///////////////////////////////////////////////////////////////////////////////
        // console log
        ///////////////////////////////////////////////////////////////////////////////
        var joinList = function (list, separator) {
            if (!list || !(typeof list.join === 'function')) {
                console.log('Invalid list type for join: ' + list);
                debugger;
                return list;
            }
            return list.join(separator);
        };

        var listDirectories = function (sourceCodeList, filter) {
            //console.log(getSourceCodeDirectoryList(sourceCodeList, filter).join('\nmkdir '));
            console.log(joinList(getSourceCodeDirectoryList(sourceCodeList, filter), '\nmkdir '));
        };

        var listFiles = function (sourceCodeList, filter) {
            //console.log(getSourceCodeFileList(sourceCodeList, filter).join('\n'));
            console.log(joinList(getSourceCodeFileList(sourceCodeList, filter), '\n'));
        };

        var listResources = function () {
            //console.log(getResourceFileList().join('\n'));
            console.log(joinList(getResourceFileList(), '\n'));
        };

        var logListData = function (message, data) {
            ///////////////////////////////////////////////////////////////////////////////
            var logMessage = '\n...\n' + message;

            for (var i = 0; i < data.length; i++) {
                var value = data[i];
                logMessage = logMessage + '\n' + 'data[' + i + ']=\"' + value + '\"';
            }
            console.log(logMessage);
        };

        ///////////////////////////////////////////////////////////////////////////////
        // save
        ///////////////////////////////////////////////////////////////////////////////
        /**
         * @param {string} url
         * @param {string} content
         * @param {boolean} forceSaveAs
         */
        var save = function (url, content, forceSaveAs) {
            console.log('InspectorFrontendHost.save: ' + 'url=' + url);
            DevToolsAPI.sendMessageToEmbedder('save', [url, content, forceSaveAs], null);
        };
        ///////////////////////////////////////////////////////////////////////////////

        var saveAsCSV = function (dataList, suffix) {
            var extension = 'txt';

            var prefix = getPageURL();

            prefix = prefix.replace(/.*\:\/\//, '');
            prefix = prefix.replace(/\//g, '-');
            prefix = prefix.replace('www.', '');
            prefix = prefix.replace('.com', '').replace('.net', '').replace('.org', '');

            var fileName = prefix + '-' + suffix + '.' + extension;

            var formattedText = '';
            if (typeof dataList === 'string') {
                formattedText = dataList;
            }
            else if (typeof dataList.join === 'function') {
                formattedText = '\"' + dataList.join('",\n"') + '\"';
            }
            else {
                formattedText = '\"' + JSON.stringify(dataList) + '\"';
            }

            if (WebInspectorPlugin._USE_WINDOWS_END_OF_LINE_) {
                formattedText = formattedText.replace('\n', '\r\n');
            }

            console.log(formattedText);

            //InspectorFrontendHost.save(fileName, formattedText, true);
            save(fileName, formattedText, true);

            return formattedText;
        };

        ///////////////////////////////////////////////////////////////////////////////
        var saveSourceFile = function (sourceFile) {
            var _saveFile = function (fileInfo, fileContent, forceSaveAs) {
                var logMessage = 'saveFile: ' +
                    'contentURL: ' + fileInfo.contentURL + ', ' +
                    'isValid: ' + fileInfo.isValid + ', ' +
                    'filePath: ' + fileInfo.filePath + ', ' +
                    'fileName: ' + fileInfo.fileName + ', ' +
                    'storedFileName: ' + fileInfo.storedFileName;
                //console.log(logMessage);
                if (_PLUGIN_.getOption('skipInvalidFiles') && !fileInfo.isValid) {
                    //console.log('IGNORE SAVE ON INVALID FILE: ' + fileInfo.fullPath);
                    return false;
                }
                else {
                    if (!WebInspectorPlugin._QUIET_MODE_) {

                        // pause execution
                        debugger;
                    }

                    console.log(logMessage);
                    //console.log('saving to: ' + fileInfo.fullPath);
                    //WebInspector.fileManager.save(fileInfo.fileName, fileContent, true);
                    //InspectorFrontendHost.save(fileInfo.fileName, fileContent, forceSaveAs);
                    //InspectorFrontendHost.save(fileInfo.fullPath, fileContent, forceSaveAs);
                    save(fileInfo.fileName, fileContent, forceSaveAs);
                }
                return true;
            };

            var sourceCode = sourceFile;
            var fileInfo = getFileInfo(sourceCode);
            var fileContent = undefined;

            if ((!fileContent) && ('workingCopy' in sourceCode)) {
                fileContent = sourceCode.workingCopy;
                if (typeof fileContent === 'function') {
                    fileContent = fileContent.call(sourceCode);
                }
                if (!!fileContent) {
                    //WebInspector.fileManager.save(fileInfo.storedFileName, fileContent, true);
                    return _saveFile(fileInfo, fileContent, true);
                }
            }

            if ((!fileContent) && ('requestContent' in sourceCode)) {
                sourceCode.requestContent(function (content) {
                    var sourceCode = sourceFile;
                    var fileInfo = getFileInfo(sourceCode);
                    //var fileContent = sourceCode._content;
                    var fileContent = content;
                    _saveFile(fileInfo, fileContent, true);
                });
            }
        };

        ///////////////////////////////////////////////////////////////////////////////
        var nonNullStringValue = function (value) {
            if (value === null) {
                return "";
            }
            return value;
        };

        ///////////////////////////////////////////////////////////////////////////////
        var checkCommandOption = function (optionName) {
            var optionValue = null;
            if (WebInspectorPlugin._ABORT_) {
                console.log('WARN: execution flag {_ABORT_} is set...')
                optionValue = false;
                return optionValue;
            }
            else {
                if (_PLUGIN_.hasOption(optionName)) {
                    optionValue = _PLUGIN_.getOption(optionName);
                }
                else {
                    console.log('WARN: option flag {' + optionName + '} is not defined');
                    optionValue = false;
                }
            }
            console.log('INFO: option flag {' + optionName + '}=' + optionValue);
            return optionValue;
        };

        ///////////////////////////////////////////////////////////////////////////////
        var saveAll = function (sourceCodeList) {
            for (var i = 0; i < sourceCodeList.length; i++) {
                if (WebInspectorPlugin._ABORT_) {
                    console.log('WARNING: execution flag {_ABORT_} is set...')
                    return;
                }
                var sourceCode = sourceCodeList[i];
                saveSourceFile(sourceCode);
                /*
                 var _saveAfterDelay = function(sourceCode) {
                 setTimeout(function() { saveSourceFile(sourceCode); }, 2000);
                 }(sourceCode);
                 */
            }
        };

        ///////////////////////////////////////////////////////////////////////////////
        // sort
        ///////////////////////////////////////////////////////////////////////////////
        // sort URLs
        var sortList = function (path_list) {

            ///////////////////////////////////////////////////////////////////////////////
            //logListData('UNSORTED path_list:', path_list);
            ///////////////////////////////////////////////////////////////////////////////

            var compareStringIgnoreCase = function (a, b) {
                var _a = (typeof a === 'string') ? a.toLowerCase() : a;
                var _b = (typeof b === 'string') ? b.toLowerCase() : b;
                return _a > _b ? 1 : -1;
            };
            path_list.sort(compareStringIgnoreCase);

            ///////////////////////////////////////////////////////////////////////////////
            //logListData('SORTED path_list:', path_list);
            ///////////////////////////////////////////////////////////////////////////////

            return path_list;
        };

        ///////////////////////////////////////////////////////////////////////////////
        // filter
        ///////////////////////////////////////////////////////////////////////////////
        var isValidURL = function (path) {

            //var invalid_url_regex = /^chrome-extension\:|^extensions\:\:|^debugger\:/gi;
            var invalid_url_regex = /^chrome-extension\:|^extensions\:\:|^debugger\:|^about:blank$|^miscellaneous_bindings$|^json_schema$|^utils$|^json$|^lastError$|^app$|^extension$|^binding$|^event_bindings$|^sendRequest$|^schemaUtils$|^runtime$/gi;

//            var _invalid_url_prefix = [
//                "chrome-extension:",
//                "extensions::",
//                "debugger:"
//            ];
//            var _invalid_url_path = [
//                "",
//                "about:blank",
//                "miscellaneous_bindings",
//                "json_schema",
//                "utils",
//                "json",
//                "lastError",
//                "app",
//                "extension",
//                "binding",
//                "event_bindings",
//                "sendRequest",
//                "schemaUtils",
//                "runtime"
//            ];

            if (invalid_url_regex.test(path)) {
                console.log('isValidURL: Invalid path : path=' + path);
                return false;
            }

            return path && path.length > 0;
        };

        // filter URLs
        var filterInvalidURLs = function (data) {
            //console.log('filterInvalidURLs: url=' + url);
            var url = (data && ('contentURL' in data)) ? data.contentURL : data;
            return isValidURL(url);
        };

        ///////////////////////////////////////////////////////////////////////////////
        // load source code list from workspace
        ///////////////////////////////////////////////////////////////////////////////

        //var data = WebInspector.workspace._project._uiSourceCodes;
        /** @type {Array<WebInspector.UISourceCode>} */
            //var sourceCodeList = WebInspector.workspace.uiSourceCodes();
            //var sourceCodeList = Workspace.workspace.uiSourceCodesForProjectType(Workspace.projectTypes.Network);
            //var sourceCodeList = UI.panels.sources._workspace.uiSourceCodesForProjectType(Workspace.projectTypes.Network);
        var sourceCodeList = Workspace.workspace.uiSourceCodes();
        var sourceFileList = getFileInfoList(sourceCodeList);

        //sortList(sourceFileList);

        debugger;

        if (checkCommandOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_create_dir_list)) {
            console.log('\n\nPATH LIST...');
            listDirectories(sortList(sourceFileList), filterInvalidURLs);
            var _mkdir_cmd_ = 'mkdir ' + getSourceCodeDirectoryList(sourceFileList, filterInvalidURLs).join('\nmkdir ');
            _mkdir_cmd_ = _mkdir_cmd_ + '\n';
            saveAsCSV(_mkdir_cmd_, 'create-dir-list');

        }
        if (checkCommandOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_move_file_list)) {
            var _move_file_delegate_ = function (data) {
                return 'move /Y ' + data.storedFileName + ' ' + data.filePath;
            };
            var _move_cmd_list = getValuesByPropertyName(sourceFileList, _move_file_delegate_, filterInvalidURLs);

            var _move_cmd_ = _move_cmd_list.join('\n');
            _move_cmd_ = _move_cmd_ + '\n';
            saveAsCSV(_move_cmd_, 'move-file-list');
        }
        if (checkCommandOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_curl_command_file_list)) {
            debugger;
            var _curl_file_delegate_ = function (data) {

                /** @type {RegExp} */
                var regex_pattern = /\"(http\:\/\/|https\:\/\/)(.+)\"\,?'/gmi;
                /** @type {string} */
                var regex_replace_text = 'curl --create-dirs --output $2 $1$2';

                // /** @type {string} */
                // var regex_pattern_text = '\"(http\:\/\/|https\:\/\/)(.+)\"\,?';
                // /** @type {RegExp} */
                // var regex = new RegExp(regex_pattern_text, 'gim');

                /** @type {string} */
                var curl_command_template_text = 'curl --create-dirs --output _FILEPATH__FILE_SEPARATOR__FILENAME_ _CONTENT_URL_';

                /** @type {string} */
                var _contentURL = nonNullStringValue(data.contentURL);
                /** @type {string} */
                var _fileName = nonNullStringValue(data.fileName);
                /** @type {string} */
                var _filePath = nonNullStringValue(data.filePath);
                /** @type {string} */
                var _fullPath = nonNullStringValue(data.fullPath);
                /** @type {string} */
                var _storedFileName = nonNullStringValue(data.storedFileName);

                // var formattedCommand = _contentURL.replace(regex_pattern, regex_replace_text);
                // var formattedCommand = String.prototype.replace.call(_contentURL, regex_pattern, regex_replace_text);
                var formattedCommand = curl_command_template_text
                    .replace(/_FILEPATH_/g, _filePath)
                    .replace(/_FILE_SEPARATOR_/g, '\\')
                    .replace(/_FILENAME_/g, _storedFileName)
                    .replace(/_CONTENT_URL_/g, _contentURL);

                // return 'move /Y ' + data.storedFileName + ' ' + data.filePath;

                return formattedCommand;
            };
            var _curl_cmd_list = getValuesByPropertyName(sourceFileList, _curl_file_delegate_, filterInvalidURLs);
            // var _curl_cmd_list = getValuesByPropertyName(sourceFileList, 'contentURL', filterInvalidURLs);

            var _curl_cmd_ = _curl_cmd_list.join('\n');
            _curl_cmd_ = _curl_cmd_ + '\n';
            saveAsCSV(_curl_cmd_, 'curl-command-file-list');
        }
        if (checkCommandOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_all_urls)) {
            console.log('\n\nALL-URL LIST...');
            saveAsCSV(sortList(getSourceCodeURLs(sourceFileList)), 'all-urls');
        }
        if (checkCommandOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_valid_urls)) {
            console.log('\n\nVALID-URL LIST...');
            saveAsCSV(sortList(getSourceCodeURLs(sourceFileList, filterInvalidURLs)), 'valid-urls');
        }
        if (checkCommandOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_resources)) {
            console.log('\n\nRESOURCE LIST...');
            saveAsCSV(getResourceFileList(filterInvalidURLs), 'resources');
        }
        if (checkCommandOption(WebInspectorPlugin._COMMAND_OPTIONS_.save_source_files)) {
            console.log('\n\nSAVE...');
            saveAll(sourceFileList);
        }
    }

};

/** @type {WebInspectorPlugin} */
WebInspectorPlugin.runPlugin();

delete window.WebInspectorPlugin;
