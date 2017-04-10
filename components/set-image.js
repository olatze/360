{\rtf1\ansi\ansicpg1252\cocoartf1504\cocoasubrtf760
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw56692\paperh39685\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 /* global AFRAME */\
\
/**\
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it\
 * back in.\
 */\
AFRAME.registerComponent('set-image', \{\
  schema: \{\
    on: \{type: 'string'\},\
    target: \{type: 'selector'\},\
    src: \{type: 'string'\},\
    dur: \{type: 'number', default: 300\}\
  \},\
\
  init: function () \{\
    var data = this.data;\
    var el = this.el;\
\
    this.setupFadeAnimation();\
\
    el.addEventListener(data.on, function () \{\
      // Fade out image.\
      data.target.emit('set-image-fade');\
      // Wait for fade to complete.\
      setTimeout(function () \{\
        // Set image.\
        data.target.setAttribute('material', 'src', data.src);\
      \}, data.dur);\
    \});\
  \},\
\
  /**\
   * Setup fade-in + fade-out.\
   */\
  setupFadeAnimation: function () \{\
    var data = this.data;\
    var targetEl = this.data.target;\
\
    // Only set up once.\
    if (targetEl.dataset.setImageFadeSetup) \{ return; \}\
    targetEl.dataset.setImageFadeSetup = true;\
\
    // Create animation.\
    targetEl.setAttribute('animation__fade', \{\
      property: 'material.color',\
      startEvents: 'set-image-fade',\
      dir: 'alternate',\
      dur: data.dur,\
      from: '#FFF',\
      to: '#000'\
    \});\
  \}\
\});}