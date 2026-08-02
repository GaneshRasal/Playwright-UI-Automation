// services/dom-service.js

export class DOMService {

    static SELECTOR = `
        input,
        button,
        textarea,
        select,
        a,
        label,
        output,
        [role='button'],
        [contenteditable='true']
    `;

    static async extract(page) {

        const elements = await page.evaluate((selector) => {

            function getLabel(el) {

                if (!el.id) return "";

                const label = document.querySelector(
                    `label[for="${el.id}"]`
                );

                return label ? label.innerText.trim() : "";
            }

            function getXPath(element) {

                if (element.id)
                    return `//*[@id="${element.id}"]`;

                const parts = [];

                while (element && element.nodeType === Node.ELEMENT_NODE) {

                    let index = 1;

                    let sibling = element.previousElementSibling;

                    while (sibling) {

                        if (sibling.tagName === element.tagName)
                            index++;

                        sibling = sibling.previousElementSibling;
                    }

                    parts.unshift(
                        `${element.tagName.toLowerCase()}[${index}]`
                    );

                    element = element.parentElement;
                }

                return "/" + parts.join("/");
            }

            return [...document.querySelectorAll(selector)]
                .filter(el => {

                    const visible =
                        !!(
                            el.offsetWidth ||
                            el.offsetHeight ||
                            el.getClientRects().length
                        );

                    return visible;

                })
                .map((el, index) => ({

                    elementId: index,

                    tag: el.tagName.toLowerCase(),

                    type: el.type || "",

                    id: el.id || "",

                    name: el.name || "",

                    label: getLabel(el),

                    placeholder: el.placeholder || "",

                    text: (el.innerText || "").trim(),

                    value: el.value || "",

                    role: el.getAttribute("role") || "",

                    disabled: el.disabled || false,

                    xpath: getXPath(el)

                }));

        }, this.SELECTOR);

        return elements;

    }

}