# NeuroFlow

An attempt to merge block- and flow-based programming concepts into one package with brain-computer interfaces (BCI).

## Building

First, make sure that all the dependencies are installed by running:

```bash
yarn # or npm install
```

Then, to build the project, simply run:

```bash
yarn build # or npm run build
```

The generated entry point will be generated in `public/index.html`. If you wish to self-host
in order to test, run

```bash
node server.js
```

and then open a web-browser to [http://localhost:8080](http://localhost:8080).

## Usage

The interface uses [Blockly](https://developers.google.com/blockly/) under the hood and behaves very
similarly to stock Blockly applications. The following components are included as well:

- [Rete](https://rete.js.org/) provides the flow-based components and can be added by selecting `Flow`
from the flyout menu in Blockly. These components have an edit icon which brings up the Rete interface as
well as a few dropdown menus with supported flow components. Simple select and connect all components, with the
final exit-point being a `Blockly End` component, in order to use this interface.

- Players are small, graphical figures (which show up in the playground on the left) which can be added by selecting
the `+` beneath the playground. Afterwards, they can be manipulated either with the mouse or through code by
utilizing the Blockly blocks located in the `Players` flyout menu.

- [Chart.js](https://www.chartjs.org/) provides grpahing capabilities below the player playground. The provided
graph can be used from within a flow context by connecting a block which outputs an array into the
`Plot Graph` flow component, under the `GRAPH` group.

### Execution

By default, the program made in the Blockly editor can be run by pressing the play button located in the upper
right part of the navigation bar. As the program executes, the currently executing block will highlight itself
and all graphical components will update as used.

### Connecting a BCI device

__Note: This will only work on WebBluetooth enabled browsers (such as Chromium or Google Chrome)__

In order to connect a BCI device (such as the [Muse](https://choosemuse.com/) or
[OpenBCI Ganglion](https://shop.openbci.com/products/pre-order-ganglion-board?variant=13461804483)), press
the bluetooth icon located next to the play button in the navigation bar. A popup should appear with
possible BCI devices listed. Once connected, the bluetooth icon will update to show that a connection has been
established. Clicking on the bluetooth icon again will disconnect the currently connected device.

If the currently connected device supports telemetry information (such as battery status), then the battery
indicator will reflect the current battery status of the device (TODO: Currently disabled. See
[src/main.ts](src/main.ts#L556)).

### Saving / Loading

In order to save the contents of the current workspace (including all players and defined flow blocks), press
the floppy disk icon located next to the bluetooth icon. In order to load a saved workspace, click the load icon
next to the save icon and select a file containing a valid workspace.

## TODO

- Add a way to delete flow blocks after creation.
- Make graphing smarter and support multiple flow graphing.
