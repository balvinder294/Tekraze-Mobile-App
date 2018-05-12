import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'stripHTML'
})
@Injectable()
export class StripHtmlProvider {

	transform(html: string) {
		return html.replace(/<(?:.|\n)*?>/gm, '');
	}
}
