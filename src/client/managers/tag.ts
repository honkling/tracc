import { User } from 'discord.js';
import { writeFileSync } from 'fs';
import { join } from 'path';

export class TagManager {
	static getTags() {
		return require(join(__dirname, '../../tags.json'));
	}

	static getTag(name: string) {
		return TagManager.getTags().tags[name];
	}

	static createTag(name: string, content: string) {
		const tags = TagManager.getTags();
		tags.tags[name] = content;
		TagManager.write(tags);
	}

	static removeTag(name: string) {
		const tags = TagManager.getTags();
		delete tags.tags[name];
		TagManager.write(tags);
	}

	static getTagList() {
		const tags: string[] = [];
		for (const i in TagManager.getTags().tags) tags.push(i);
		return tags;
	}

	static addManager(member: User) {
		const tags = TagManager.getTags();
		tags.managers.push(member.id);
		TagManager.write(tags);
	}

	static removeManager(member: User) {
		const tags = TagManager.getTags();
		tags.managers.splice(tags.managers.indexOf(member.id), 1);
		TagManager.write(tags);
	}

	static getManagers(): string[] {
		const tags = TagManager.getTags();
		return tags.managers;
	}

	static write(tags) {
		writeFileSync(join(__dirname, '../../tags.json'), JSON.stringify(tags));
	}
}
