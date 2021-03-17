//Dùng FilePond

FilePond.registerPlugin
(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
)

FilePond.parse(document.body);