# Screeps Prometheus Game

This is the library to make setting up screepsPrometheus easier.

## Usage

Install the package from npm.

```
npm i --save-dev @brainwart/screeps-prometheus-game
```

Import the ScreepPrometheus class.

```typescript
import { ScreepsPrometheus } from '@brainwart/screeps-prometheus-game';
```

Create a copy of the class

```typescript
const prom = new ScreepsPrometheus();
```

Add prefixes, gauges, and labels as needed

```typescript
const prom = new ScreepsPrometheus();
const cpu = prom.add(Prefix, 'cpu');
cpu.add(Gauge, 'used', Game.cpu.getUsed());
cpu.add(Gauge, 'bucket', Game.cpu.bucket);

const rooms = prom.add(Prefix, 'roomSummary');

for (const roomName in Game.rooms) {
  const room = Game.rooms[roomName];

  if (room.controller && room.controller.my) {
    const roomSummary = rooms.add(Label, 'roomName', roomName);

    const controller = roomSummary.add(Prefix, 'controller');
    controller.add(Gauge, 'level', room.controller.level, 'Current controller level');
    controller.add(Gauge, 'progress', room.controller.progress);
    controller.add(Gauge, 'progressNeeded', room.controller.progressTotal);
    controller.add(Gauge, 'downgrade', room.controller.ticksToDowngrade);

    if (room.storage) {
      const storage = roomSummary.add(Prefix, 'storage');
      storage.add(Gauge, 'energy', 20);
    }
  }
}

Memory.stats = prom.build();
```
