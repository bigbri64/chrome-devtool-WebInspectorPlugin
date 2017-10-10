
window.WebInspectorPlugin = {

    saveWorkspace : function () {

        var toFileURL = function (path) {
            return path.toLowerCase().replace(/\//g, '\\').replace(/:/g, '-');
        };

        var getFileInfo = function (content) {
            //content.workingCopy()
            var contentURL = (typeof content === 'string') ? content : ((!!content.contentURL) ? content.contentURL() : content);
            var parsedURL = new WebInspector.ParsedURL(contentURL);
            var filePath = toFileURL(parsedURL.host) + toFileURL(parsedURL.folderPathComponents);
            // + parsedURL.displayName;
            filePath = toFileURL(filePath);

            //WebInspector.inspectedPageDomain
            //WebInspector.inspectedPageURL

            //var displayName = WebInspector.displayNameForURL(contentURL);
            var fileName = toFileURL(parsedURL.lastPathComponent);
            fileName = fileName ? fileName : toFileURL(parsedURL.displayName);

            var fullPath = filePath + '\\' + fileName;

            var fileInfo = {
                isValid : parsedURL.isValid,
                contentURL : content.contentURL(),
                fullPath : fullPath,
                filePath : filePath,
                fileName : fileName
            };

            return fileInfo;
        };

        var saveSourceFile = function (sourceFile) {
            debugger;
            var sourceCode = sourceFile;
            if (sourceCode.workingCopy()) {
                var fileInfo = getFileInfo(sourceCode);
                var fileContent = sourceCode.workingCopy();
                console.log('saving to: ' + fileInfo.fullPath);
                //WebInspector.fileManager.save(fileInfo.fileName, fileContent, true);
                InspectorFrontendHost.save(fileInfo.fileName, fileContent, true);
            }
            else {
                sourceCode.requestContent(function (content) {
                    var sourceCode = sourceFile;
                    var fileInfo = getFileInfo(sourceCode);
                    //var fileContent = sourceCode._content;
                    var fileContent = content;
//                console.log('Saving: ' + fileInfo.contentURL);
//                console.log('- isValid: ' + fileInfo.isValid);
//                console.log('- filePath: ' + fileInfo.filePath);
//                console.log('- isValid: ' + fileInfo.fileName);
                    console.log('saving to: ' + fileInfo.fullPath);
                    //WebInspector.fileManager.save(fileInfo.fileName, fileContent, true);
                    InspectorFrontendHost.save(fileInfo.fileName, fileContent, true);
                });
            }
        };

        ///////////////////////////////////////////////////////////////////////////////
        var getFileInfoList = function (sourceCodeList) {
            WebInspector.showPanel("sources");
            var _files = [];
            for (var i = 0; i < sourceCodeList.length; i++) {
                var sourceCode = sourceCodeList[i];
                var fileInfo = getFileInfo(sourceCode);
                _files.push(fileInfo);
            }
            return _files;
        };
        ///////////////////////////////////////////////////////////////////////////////
        var getResourceFileList = function (filter) {
            WebInspector.showPanel("resources");
            //document.querySelectorAll('.panel.resources');
            var resourceNodeList = document.querySelectorAll('li[class*="resources-type-"]');
            var _resources = [];
            for (var i = 0; i < resourceNodeList.length; i++) {
                var resourceNode = resourceNodeList[i];
                if(filter && !filter(resourceNode.title)) {
                    continue;
                }
                _resources.push(resourceNode.title);
            }
            return _resources;
        };
        ///////////////////////////////////////////////////////////////////////////////
        var getSourceCodeURLs = function (sourceFileList, filter) {
            var _urls = [];
            for (var i = 0; i < sourceFileList.length; i++) {
                var fileInfo = sourceFileList[i];
                //console.log(fileInfo.contentURL);
                if(filter && !filter(fileInfo.contentURL)) {
                    continue;
                }
                _urls.push(fileInfo.contentURL);
            }
            return _urls;
        };
        var getSourceCodeDirectoryList = function (sourceFileList) {
            var _directories = [];
            for (var i = 0; i < sourceFileList.length; i++) {
                var fileInfo = sourceFileList[i];
                //console.log('rem ' + fileInfo.contentURL);
                _directories.push(fileInfo.filePath);
            }
            return _directories;
        };
        var getSourceCodeFileList = function (sourceFileList) {
            var _files = [];
            for (var i = 0; i < sourceFileList.length; i++) {
                var fileInfo = sourceFileList[i];
                //console.log('rem ' + fileInfo.contentURL);
                _files.push(fileInfo.fullPath);
            }
            return _files;
        };
        ///////////////////////////////////////////////////////////////////////////////
        var listDirectories = function (sourceCodeList) {
            console.log(getSourceCodeDirectoryList(sourceCodeList).join('\n'));
        };

        var listFiles = function (sourceCodeList) {
            console.log(getSourceCodeFileList(sourceCodeList).join('\n'));
        };

        var listResources = function () {
            console.log(getResourceFileList().join('\n'));
        };
        ///////////////////////////////////////////////////////////////////////////////
        var saveAsCSV = function (dataList, suffix) {
            var extension = 'txt';
            var prefix = WebInspector.inspectedPageDomain.replace('www.', '').replace('.com', '');
            prefix = prefix.replace('www.', '');
            prefix = prefix.replace('.com', '').replace('.net', '').replace('.org', '');

            var fileName = prefix + '-' + suffix + '.' + extension;

            var formattedText = '"' + dataList.join('",\n"') + '"';
            console.log(formattedText);

            console.log('InspectorFrontendHost.save: ');

            InspectorFrontendHost.save(fileName, formattedText, true);

            return formattedText;
        };

        var saveAll = function (sourceCodeList) {
            for (var i = 0; i < sourceCodeList.length; i++) {
                var sourceCode = sourceCodeList[i];
                saveSourceFile(sourceCode);
            }
        };

        //var data = WebInspector.workspace._project._uiSourceCodes;
        var sourceCodeList = WebInspector.workspace.uiSourceCodes();
        var sourceFileList = getFileInfoList(sourceCodeList);

        debugger;

        var filterAboutBlank = function(url) {
            return url !== 'about:blank';
        };

        console.log('\n\nURL LIST...');
        saveAsCSV(getSourceCodeURLs(sourceFileList, filterAboutBlank), 'urls');

        // console.log('\n\nPATH LIST...');
        // listDirectories(sourceFileList);

        // console.log('\n\nSAVE...');
        // saveAll(sourceCodeList);

        console.log('\n\nRESOURCE LIST...');
        saveAsCSV(getResourceFileList(filterAboutBlank), 'resources');

    }

};

WebInspectorPlugin.saveWorkspace();

delete window.WebInspectorPlugin;