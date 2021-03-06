import SigninView from '../views/signin/SigninView.js';
import SigninModel from '../models/SigninModel.js';
import EventBus from '../lib/eventbus/eventbus.js';
import {HEADER} from "../lib/eventbus/events";

const eventList = [
    'signin',
    'signinResponse',
    'signinSuccess',
    'loadWaiting'
];

export default class SigninController {
    constructor ({ router, globalEventBus } = {}) {
        const eventBus = new EventBus(eventList);

        eventBus.subscribeToEvent('signinSuccess', (data) => {
            router.toStartPage();
            globalEventBus.triggerEvent(HEADER.LOAD, data);
        });

        this.signinView = new SigninView({ eventBus });
        this.signinModel = new SigninModel(eventBus);
    }
}
