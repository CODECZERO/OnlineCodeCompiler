import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages, } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

function ControllerCode() {
    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );
    return (
        <div className=' flex items-center justify-center'>
            <div>

                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => highlight(code, languages.js)}
                    padding={30}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        backgroundColor: "black",
                        width:900,
                        height:800

                    }}
                />
            </div>
            {console.log()}
        </div>
    );
}
export default ControllerCode