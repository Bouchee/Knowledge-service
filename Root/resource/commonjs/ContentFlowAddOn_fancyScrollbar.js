/*  ContentFlowAddOn_fancyScrollbar, version 3.0 
 *  (c) 2008 - 2010 Sebastian Kutsch
 *  <http://www.jacksasylum.eu/ContentFlow/>
 *
 *  This file is distributed under the terms of the MIT license.
 *  (see http://www.jacksasylum.eu/ContentFlow/LICENSE)
 */

new ContentFlowAddOn ('fancyScrollbar', {

    init: function  () {
        this.addStylesheet();
    },

    onloadInit: function (flow) {
        if (!flow.Scrollbar) {
            flow.Scrollbar = new ContentFlowGUIElement(flow, document.createElement('div'));
            flow.Scrollbar.className = 'scrollbar';
            flow.Container.appendChild(flow.Scrollbar);
        }

        if (!flow.Slider) {
            flow.Slider = new ContentFlowGUIElement(flow, document.createElement('div'));
            flow.Slider.className = 'slider';
            flow.Position = new ContentFlowGUIElement(flow, document.createElement('div'));
            flow.Position.className = 'position';
            flow.Slider.appendChild(flow.Position);
            flow.Scrollbar.appendChild(flow.Slider);
        }

        var pre = flow.Scrollbar.getChildrenByClassName('preButton')[0];
        if (!pre) {
            pre = document.createElement('div');
            pre.className = 'preButton';
            flow.Scrollbar.appendChild(pre);
        }
        var next = flow.Scrollbar.getChildrenByClassName('nextButton')[0];
        if (!next) {
            next = document.createElement('div');
            next.className = 'nextButton';
            flow.Scrollbar.appendChild(next);
        }
        
    }

});
