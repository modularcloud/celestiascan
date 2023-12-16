/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Params } from "./params";
import { Rollapp } from "./rollapp";
import { BlockHeightToFinalizationQueue, StateInfo, StateInfoIndex } from "./state_info";

export const protobufPackage = "dymensionxyz.dymension.rollapp";

/** GenesisState defines the rollapp module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  rollappList: Rollapp[];
  stateInfoList: StateInfo[];
  latestStateInfoIndexList: StateInfoIndex[];
  latestFinalizedStateIndexList: StateInfoIndex[];
  /** this line is used by starport scaffolding # genesis/proto/state */
  blockHeightToFinalizationQueueList: BlockHeightToFinalizationQueue[];
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    rollappList: [],
    stateInfoList: [],
    latestStateInfoIndexList: [],
    latestFinalizedStateIndexList: [],
    blockHeightToFinalizationQueueList: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.rollappList) {
      Rollapp.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.stateInfoList) {
      StateInfo.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.latestStateInfoIndexList) {
      StateInfoIndex.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.latestFinalizedStateIndexList) {
      StateInfoIndex.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.blockHeightToFinalizationQueueList) {
      BlockHeightToFinalizationQueue.encode(v!, writer.uint32(50).fork()).ldelim();
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

          message.params = Params.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.rollappList.push(Rollapp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.stateInfoList.push(StateInfo.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.latestStateInfoIndexList.push(StateInfoIndex.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.latestFinalizedStateIndexList.push(StateInfoIndex.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.blockHeightToFinalizationQueueList.push(
            BlockHeightToFinalizationQueue.decode(reader, reader.uint32()),
          );
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
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      rollappList: globalThis.Array.isArray(object?.rollappList)
        ? object.rollappList.map((e: any) => Rollapp.fromJSON(e))
        : [],
      stateInfoList: globalThis.Array.isArray(object?.stateInfoList)
        ? object.stateInfoList.map((e: any) => StateInfo.fromJSON(e))
        : [],
      latestStateInfoIndexList: globalThis.Array.isArray(object?.latestStateInfoIndexList)
        ? object.latestStateInfoIndexList.map((e: any) => StateInfoIndex.fromJSON(e))
        : [],
      latestFinalizedStateIndexList: globalThis.Array.isArray(object?.latestFinalizedStateIndexList)
        ? object.latestFinalizedStateIndexList.map((e: any) => StateInfoIndex.fromJSON(e))
        : [],
      blockHeightToFinalizationQueueList: globalThis.Array.isArray(object?.blockHeightToFinalizationQueueList)
        ? object.blockHeightToFinalizationQueueList.map((e: any) => BlockHeightToFinalizationQueue.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.params !== undefined) {
      obj.params = Params.toJSON(message.params);
    }
    if (message.rollappList?.length) {
      obj.rollappList = message.rollappList.map((e) => Rollapp.toJSON(e));
    }
    if (message.stateInfoList?.length) {
      obj.stateInfoList = message.stateInfoList.map((e) => StateInfo.toJSON(e));
    }
    if (message.latestStateInfoIndexList?.length) {
      obj.latestStateInfoIndexList = message.latestStateInfoIndexList.map((e) => StateInfoIndex.toJSON(e));
    }
    if (message.latestFinalizedStateIndexList?.length) {
      obj.latestFinalizedStateIndexList = message.latestFinalizedStateIndexList.map((e) => StateInfoIndex.toJSON(e));
    }
    if (message.blockHeightToFinalizationQueueList?.length) {
      obj.blockHeightToFinalizationQueueList = message.blockHeightToFinalizationQueueList.map((e) =>
        BlockHeightToFinalizationQueue.toJSON(e)
      );
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.rollappList = object.rollappList?.map((e) => Rollapp.fromPartial(e)) || [];
    message.stateInfoList = object.stateInfoList?.map((e) => StateInfo.fromPartial(e)) || [];
    message.latestStateInfoIndexList = object.latestStateInfoIndexList?.map((e) => StateInfoIndex.fromPartial(e)) || [];
    message.latestFinalizedStateIndexList =
      object.latestFinalizedStateIndexList?.map((e) => StateInfoIndex.fromPartial(e)) || [];
    message.blockHeightToFinalizationQueueList =
      object.blockHeightToFinalizationQueueList?.map((e) => BlockHeightToFinalizationQueue.fromPartial(e)) || [];
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
