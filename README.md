# Screeps Prometheus Game

This is the library to make setting up screepsPrometheus easier.

## Usage

Install the package from npm.

```
npm i @brainwart/screeps-prometheus-game
```

Import the ScreepPrometheus class.

```typescript
import { ScreepsPrometheus } from '@brainwart/screeps-prometheus-game/lib/index';
```

Create a copy of the class

```typescript
const prom = new ScreepsPrometheus();
```

Add prefixes, gauges, and labels as needed

```typescript
const cpu = prom.addPrefix('cpu');
cpu.addGauge('used', Game.cpu.getUsed());
cpu.addGauge('bucket', Game.cpu.bucket);

const rooms = prom.addPrefix('roomSummary');

for (const roomName in Game.rooms) {
  const room = Game.rooms[roomName];

  if (room.controller && room.controller.my) {
    const roomSummary = rooms.addLabel('roomName', roomName);

    const controller = roomSummary.addPrefix('controller');
    controller.addGauge('level', room.controller.level).addHelp('Current controller level');
    controller.addGauge('progress', room.controller.progress);
    controller.addGauge('progressNeeded', room.controller.progressTotal);
    controller.addGauge('downgrade', room.controller.ticksToDowngrade);

    if (room.storage) {
      const storage = roomSummary.addPrefix('storage');
      storage.addGauge('energy', 20);
    }
  }
}
```
