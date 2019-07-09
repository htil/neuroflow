declare module "ganglion-ble" {
	import { Subject } from "rxjs";

	interface EEGSample {
		data: [number, number, number, number],
		timestamp: Date
	}

	class Ganglion {
		stream: Subject<EEGSample>;
		
		constructor();

		connect(gatt: BluetoothRemoteGATTServer): Promise<void>;
		start(): Promise<void>;
		disconnect(): Promise<void>;
	}
}