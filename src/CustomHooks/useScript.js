import { useEffect } from 'react';

export default function useScript(args) {

    const loadScript = (scriptUrl, options) => {
        if (document.querySelectorAll(`script[src="${scriptUrl}"]`).length > 0) {
            console.log('script loaded before');
            return;
        }
        else {
            const script = document.createElement('script');
            script.src = scriptUrl;
            if (options) {
                if (options.defer) {
                    script.setAttribute('defer', '');
                }
                if (options.async) {
                    script.setAttribute('async', '');
                }
            }
            /*script.setAttribute('data-description','odeme aciklamasi');
            args.attributes.map(
                attr =>
                    script.setAttribute(attr.name, attr.value)
            )*/
            console.log(script);
            document.body.appendChild(script);
        }

    }

    return loadScript;

}