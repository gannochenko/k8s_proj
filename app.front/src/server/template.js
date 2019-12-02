import fs from 'fs';
import util from 'util';

export class Template {
    constructor(settings) {
        this.settings = settings;
        this.portHMR = __DEV__
            ? settings.getSync('NETWORK__PORT__HMR', 3001)
            : 0;
        this.templatePath = settings.getSync(
            'TEMPLATE__PATH',
            __DEV__ ? './index.html' : './public/index.html',
        );
    }

    readFile = util.promisify(fs.readFile);

    /**
     * todo: fill placeholders with the parameters
     */
    async get() {
        return this.read();
    }

    async read() {
        if (!this.template) {
            let template = (await this.readFile(this.templatePath)).toString(
                'utf8',
            );
            if (__DEV__) {
                template = template.replace(
                    '</body>',
                    `<script>document.write('<sc'+'ript src="http://'+document.location.hostname+':${this.portHMR}/client.js"></sc'+'ript>')</script></body>`,
                );
            }

            template = template.replace(
                '<!--ENV-->',
                `<script>window.process = {env: ${JSON.stringify(
                    this.forwardEnv(),
                )}};</script>`,
            );

            this.template = template;
        }

        return this.template;
    }

    forwardEnv() {
        return {
            API__URL: process.env.API__URL || '',
        };
    }
}
