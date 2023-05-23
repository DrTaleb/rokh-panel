import React, {useEffect, useRef} from "react";
// import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar } from '@ckeditor/ckeditor5-image';
// import { LinkImage } from '@ckeditor/ckeditor5-link';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';

function Editor({onChange, editorLoaded, name, value}) {
    const editorRef = useRef();
    const {CKEditor, ClassicEditor} = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),

        };
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    config={{
                        ckfinder: {
                            language: 'fa',
                            uploadUrl: 'http://localhost:3000/api/a',
                        }
                    }}
                    style={{height: 500}}
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onChange(data);
                    }}

                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
}

export default Editor;