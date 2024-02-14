/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "osmosis.epochs.v1beta1";

/**
 * EpochInfo is a struct that describes the data going into
 * a timer defined by the x/epochs module.
 */
export interface EpochInfo {
  /** identifier is a unique reference to this particular timer. */
  identifier: string;
  /**
   * start_time is the time at which the timer first ever ticks.
   * If start_time is in the future, the epoch will not begin until the start
   * time.
   */
  startTime:
    | Date
    | undefined;
  /**
   * duration is the time in between epoch ticks.
   * In order for intended behavior to be met, duration should
   * be greater than the chains expected block time.
   * Duration must be non-zero.
   */
  duration:
    | Duration
    | undefined;
  /**
   * current_epoch is the current epoch number, or in other words,
   * how many times has the timer 'ticked'.
   * The first tick (current_epoch=1) is defined as
   * the first block whose blocktime is greater than the EpochInfo start_time.
   */
  currentEpoch: Long;
  /**
   * current_epoch_start_time describes the start time of the current timer
   * interval. The interval is (current_epoch_start_time,
   * current_epoch_start_time + duration] When the timer ticks, this is set to
   * current_epoch_start_time = last_epoch_start_time + duration only one timer
   * tick for a given identifier can occur per block.
   *
   * NOTE! The current_epoch_start_time may diverge significantly from the
   * wall-clock time the epoch began at. Wall-clock time of epoch start may be
   * >> current_epoch_start_time. Suppose current_epoch_start_time = 10,
   * duration = 5. Suppose the chain goes offline at t=14, and comes back online
   * at t=30, and produces blocks at every successive time. (t=31, 32, etc.)
   * * The t=30 block will start the epoch for (10, 15]
   * * The t=31 block will start the epoch for (15, 20]
   * * The t=32 block will start the epoch for (20, 25]
   * * The t=33 block will start the epoch for (25, 30]
   * * The t=34 block will start the epoch for (30, 35]
   * * The **t=36** block will start the epoch for (35, 40]
   */
  currentEpochStartTime:
    | Date
    | undefined;
  /**
   * epoch_counting_started is a boolean, that indicates whether this
   * epoch timer has began yet.
   */
  epochCountingStarted: boolean;
  /**
   * current_epoch_start_height is the block height at which the current epoch
   * started. (The block height at which the timer last ticked)
   */
  currentEpochStartHeight: Long;
}

/** GenesisState defines the epochs module's genesis state. */
export interface GenesisState {
  epochs: EpochInfo[];
}

function createBaseEpochInfo(): EpochInfo {
  return {
    identifier: "",
    startTime: undefined,
    duration: undefined,
    currentEpoch: Long.ZERO,
    currentEpochStartTime: undefined,
    epochCountingStarted: false,
    currentEpochStartHeight: Long.ZERO,
  };
}

export const EpochInfo = {
  encode(message: EpochInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.identifier !== "") {
      writer.uint32(10).string(message.identifier);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(18).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    if (!message.currentEpoch.isZero()) {
      writer.uint32(32).int64(message.currentEpoch);
    }
    if (message.currentEpochStartTime !== undefined) {
      Timestamp.encode(toTimestamp(message.currentEpochStartTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.epochCountingStarted === true) {
      writer.uint32(48).bool(message.epochCountingStarted);
    }
    if (!message.currentEpochStartHeight.isZero()) {
      writer.uint32(64).int64(message.currentEpochStartHeight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EpochInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEpochInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.identifier = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.duration = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.currentEpoch = reader.int64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.currentEpochStartTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.epochCountingStarted = reader.bool();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.currentEpochStartHeight = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EpochInfo {
    return {
      identifier: isSet(object.identifier) ? globalThis.String(object.identifier) : "",
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      currentEpoch: isSet(object.currentEpoch) ? Long.fromValue(object.currentEpoch) : Long.ZERO,
      currentEpochStartTime: isSet(object.currentEpochStartTime)
        ? fromJsonTimestamp(object.currentEpochStartTime)
        : undefined,
      epochCountingStarted: isSet(object.epochCountingStarted)
        ? globalThis.Boolean(object.epochCountingStarted)
        : false,
      currentEpochStartHeight: isSet(object.currentEpochStartHeight)
        ? Long.fromValue(object.currentEpochStartHeight)
        : Long.ZERO,
    };
  },

  toJSON(message: EpochInfo): unknown {
    const obj: any = {};
    if (message.identifier !== "") {
      obj.identifier = message.identifier;
    }
    if (message.startTime !== undefined) {
      obj.startTime = message.startTime.toISOString();
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    if (!message.currentEpoch.isZero()) {
      obj.currentEpoch = (message.currentEpoch || Long.ZERO).toString();
    }
    if (message.currentEpochStartTime !== undefined) {
      obj.currentEpochStartTime = message.currentEpochStartTime.toISOString();
    }
    if (message.epochCountingStarted === true) {
      obj.epochCountingStarted = message.epochCountingStarted;
    }
    if (!message.currentEpochStartHeight.isZero()) {
      obj.currentEpochStartHeight = (message.currentEpochStartHeight || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EpochInfo>, I>>(base?: I): EpochInfo {
    return EpochInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EpochInfo>, I>>(object: I): EpochInfo {
    const message = createBaseEpochInfo();
    message.identifier = object.identifier ?? "";
    message.startTime = object.startTime ?? undefined;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    message.currentEpoch = (object.currentEpoch !== undefined && object.currentEpoch !== null)
      ? Long.fromValue(object.currentEpoch)
      : Long.ZERO;
    message.currentEpochStartTime = object.currentEpochStartTime ?? undefined;
    message.epochCountingStarted = object.epochCountingStarted ?? false;
    message.currentEpochStartHeight =
      (object.currentEpochStartHeight !== undefined && object.currentEpochStartHeight !== null)
        ? Long.fromValue(object.currentEpochStartHeight)
        : Long.ZERO;
    return message;
  },
};

function createBaseGenesisState(): GenesisState {
  return { epochs: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.epochs) {
      EpochInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.epochs.push(EpochInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      epochs: globalThis.Array.isArray(object?.epochs) ? object.epochs.map((e: any) => EpochInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.epochs?.length) {
      obj.epochs = message.epochs.map((e) => EpochInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.epochs = object.epochs?.map((e) => EpochInfo.fromPartial(e)) || [];
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
