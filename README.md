See https://github.com/yui/shifter for YUI Shifter, the Node based YUI module builder.

This is a complete locally hosted YUI with your own YUI module lib (yui-contrib), built with Shifter (https://github.com/yui/shifter) and served with Combohandler (https://github.com/rgrove/combohandler). It might be useful to you, it might not :)

Adding modules into the same combobase as yui will allow them to be combo loaded in the same script request as yui modules, minimising req's further.

Install Nodejs on Ubuntu:

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs npm

If you install any modules with -g remember to add to PATH
shifter is the only one that needs -g (global) install

    sudo npm install -g shifter
    export NODE_PATH=/usr/lib/node_modules/

build all modules

    cd yui3-contrib/src
    shifter --walk

build current module and build on further changes

    cd yui3-contrib/src/multi-component-pattern
    shifter --watch
    
add a version number to your module(s)
    
    shifter --replace-version=0.1

to get the YUI3 submodule

    git submodule init
    git submodule update

