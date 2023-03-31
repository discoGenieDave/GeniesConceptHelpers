var subprocess = require('subprocess');


// Function to create a custom document
function createCustomDocument() {
    // Create a new document
    var newDoc = app.documents.add(4096, 1024, 72, "Custom Document", NewDocumentMode.RGB);

    // Create layers named Front, Side, 3 Quarter, and Back
    var layerNames = ["Front", "Side", "3 Quarter", "Back"];

    for (var i = 0; i < layerNames.length; i++) {
        var newLayer = newDoc.artLayers.add();
        newLayer.name = layerNames[i];
    }

    // Create vertical guides at every 1024 pixels
    for (var i = 1; i <= 3; i++) {
        var guidePosition = 1024 * i;
        newDoc.guides.add(Direction.VERTICAL, guidePosition);
    }
}

// Function to save a document as a PNG
function savePNG(document, fileName) {
    var savePath = document.fullName.path;
    // var savetoPrismPath = "\\192.168.68.161\Genies3D\Prism\01_SCENES\Assets"
    var saveFile = new File(savePath + "/" + fileName);

    var saveOptions = new PNGSaveOptions();
    saveOptions.compression = 9;

    document.saveAs(saveFile, saveOptions, true, Extension.LOWERCASE);
}

// Create a dialog window for the buttons UI
var dialog = new Window("dialog", "Genies Concept Helper");


// Create the "Create New Document" button and add it to the dialog
var createButton = dialog.add("button", undefined, "Create New Genie");
createButton.onClick = function() {
    createCustomDocument();
};

// Create the "Save Image as PNG" button and add it to the dialog
var saveButton = dialog.add("button", undefined, "Save Image as PNG");
saveButton.onClick = function() {
    savePNG();
};



dialog.add("dropdownlist",undefined, ['GENIES', 'DNA', 'WARDROBE', 'ACCESSORIES', 'SETS']);
// Add a label below the buttons
dialog.add("statictext", undefined, "Press ESC to close the window");



// Display the dialog
dialog.center();
dialog.show();
