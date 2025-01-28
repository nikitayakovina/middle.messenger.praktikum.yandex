import profile from '../../pages/profile.hbs';
import './profile.scss';
import Handlebars from "handlebars";
import ProfileInfo from '../../components/ProfileInfo/profileInfo';
import ProfileSelected from '../../components/ProfileSelected/profileSelected';
import { profilesList } from '../../models/profiles';
import { onCustomEvent } from '../../utils/event';
import { IProfile } from '../../types/profile';
import Block from '../../utils/block';

Handlebars.registerPartial('ProfileSelected', ProfileSelected);
Handlebars.registerPartial('ProfileInfo', ProfileInfo);

type ProfileType = IProfile & { mode?: string };

interface IData {
    profiles: IProfile[];
    profile?: ProfileType
}

export default class Profile extends Block {
    profile!: IProfile;
    mode!: string;

    constructor() {
        const data: IData = {
            profiles: profilesList
        };

        super({ ...data });
    }

    // displayTemplate(): void {
    //     this.container.innerHTML = profile(this.data);

    //     if (this.data?.profile) {
    //         document.getElementById('main').addEventListener('click', (event: MouseEvent) => {
    //             // @ts-ignore
    //             const actionElement: Element = event.target.closest('.action');
    //             // @ts-ignore
    //             const actionId: string = actionElement?.dataset?.id;
    
    //             if (!actionElement) {
    //                 return;
    //             }

    //             if (actionId === 'changeData') {
    //                 const newProfile: ProfileType = { ...this.data.profile };
    //                 const index: number = profilesList.indexOf(this.data.profile);

    //                 Object.keys(this.data.profile).forEach((key: string) => {
    //                     // @ts-ignore
    //                     newProfile[key] = document.getElementById(key)?.value;
    //                 });

    //                 newProfile.id = this.data.profile.id;
    //                 newProfile.imgSrc = this.data.profile.imgSrc;
    //                 newProfile.selected = this.data.profile.selected;
    //                 newProfile.name = this.data.profile.name;

    //                 profilesList[index] = newProfile;
    //                 this.data = { ...this.data, profile: newProfile };

    //                 this.displayTemplate();
    //             } else if (actionId === 'changePassword') {
    //                 this.mode = 'changePassword';
    //                 this.data.profile = { ...this.data.profile, mode: this.mode };
    //                 this.displayTemplate();
    //             } else if (actionId === 'exit') {
    //                 onCustomEvent('redirectSignIn');
    //             } else if (actionId === 'cancel') {
    //                 this.mode = null;
    //                 this.data.profile = { ...this.data.profile, mode: this.mode };
    //                 this.displayTemplate();
    //             } else if (actionId === 'save') {
                    
    //             } else if (actionId === 'changePhoto') {
    //                 const fileInput: HTMLElement = document.getElementById('avatar');

    //                 fileInput.click();
    //                 fileInput.addEventListener('change', (event) => {
                        
    //                 });
    //             } else if (actionId === 'remove') {
    //                 const index: number = profilesList.indexOf(this.data.profile);

    //                 if (index !== -1) {
    //                     profilesList.splice(index, 1);
    //                     this.displayTemplate();
    //                 }
    //             }
    //         });
    //     }

    //     document.getElementById('profiles__sidebar__list').addEventListener('click', (event: MouseEvent) => {
    //         // @ts-ignore
    //         const profileElement: Element = event.target.closest('.profile');

    //         if (profileElement) {
    //             profilesList.forEach((item: IProfile) => item.selected = false);

    //             // @ts-ignore
    //             const profile: IProfile = profilesList.find((profile: IProfile) => Number(profile.id) === Number(profileElement?.dataset?.id));
    //             profile.selected = true;

    //             this.data = { ...this.data, profile };
    //             this.displayTemplate();
    //         }
    //     });

    //     document.getElementById('profiles__sidebar__header').addEventListener('click', (event) => {
    //         onCustomEvent('chats');
    //     });
    // }

    render() {
        this.compile(profile, this.props);
    }
}
