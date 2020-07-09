import { trigger, transition,style, query, group, animate} from '@angular/animations';

export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.3s', style({ opacity: 1 }))
        ]),
    ]);

export const fadeIn = trigger('fadeIn2', [
    transition(':enter', [
      style({opacity:0}),
      animate('500ms', style({ opacity:1 }))
    ])

])