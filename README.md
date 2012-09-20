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

    cd yui3-u1/src
    shifter --walk

build current module and build on further changes

    cd yui3-u1/src/multi-component-pattern
    shifter --watch
    
add a version number to your module(s)
    
    shifter --replace-version=0.1

to get the YUI3 submodule

    git submodule init
    git submodule update

See https://github.com/yui/shifter
