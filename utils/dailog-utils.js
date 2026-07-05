export class DialogUtils {

    static async handleDialog(page, action = 'accept', inputText = '') {

        return new Promise((resolve) => {

            page.once('dialog', async (dialog) => {

                const message = dialog.message();

                if (action === 'accept') {
                    await dialog.accept(inputText);
                } else {
                    await dialog.dismiss();
                }

                resolve(message);

            });

        });

    }

}