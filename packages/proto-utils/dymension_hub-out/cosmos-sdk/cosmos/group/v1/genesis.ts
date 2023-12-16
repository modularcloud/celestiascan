/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { GroupInfo, GroupMember, GroupPolicyInfo, Proposal, Vote } from "./types";

export const protobufPackage = "cosmos.group.v1";

/** Since: cosmos-sdk 0.46 */

/** GenesisState defines the group module's genesis state. */
export interface GenesisState {
  /**
   * group_seq is the group table orm.Sequence,
   * it is used to get the next group ID.
   */
  groupSeq: Long;
  /** groups is the list of groups info. */
  groups: GroupInfo[];
  /** group_members is the list of groups members. */
  groupMembers: GroupMember[];
  /**
   * group_policy_seq is the group policy table orm.Sequence,
   * it is used to generate the next group policy account address.
   */
  groupPolicySeq: Long;
  /** group_policies is the list of group policies info. */
  groupPolicies: GroupPolicyInfo[];
  /**
   * proposal_seq is the proposal table orm.Sequence,
   * it is used to get the next proposal ID.
   */
  proposalSeq: Long;
  /** proposals is the list of proposals. */
  proposals: Proposal[];
  /** votes is the list of votes. */
  votes: Vote[];
}

function createBaseGenesisState(): GenesisState {
  return {
    groupSeq: Long.UZERO,
    groups: [],
    groupMembers: [],
    groupPolicySeq: Long.UZERO,
    groupPolicies: [],
    proposalSeq: Long.UZERO,
    proposals: [],
    votes: [],
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.groupSeq.isZero()) {
      writer.uint32(8).uint64(message.groupSeq);
    }
    for (const v of message.groups) {
      GroupInfo.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.groupMembers) {
      GroupMember.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (!message.groupPolicySeq.isZero()) {
      writer.uint32(32).uint64(message.groupPolicySeq);
    }
    for (const v of message.groupPolicies) {
      GroupPolicyInfo.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (!message.proposalSeq.isZero()) {
      writer.uint32(48).uint64(message.proposalSeq);
    }
    for (const v of message.proposals) {
      Proposal.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.votes) {
      Vote.encode(v!, writer.uint32(66).fork()).ldelim();
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
          if (tag !== 8) {
            break;
          }

          message.groupSeq = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.groups.push(GroupInfo.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.groupMembers.push(GroupMember.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.groupPolicySeq = reader.uint64() as Long;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.groupPolicies.push(GroupPolicyInfo.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.proposalSeq = reader.uint64() as Long;
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.proposals.push(Proposal.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.votes.push(Vote.decode(reader, reader.uint32()));
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
      groupSeq: isSet(object.groupSeq) ? Long.fromValue(object.groupSeq) : Long.UZERO,
      groups: globalThis.Array.isArray(object?.groups) ? object.groups.map((e: any) => GroupInfo.fromJSON(e)) : [],
      groupMembers: globalThis.Array.isArray(object?.groupMembers)
        ? object.groupMembers.map((e: any) => GroupMember.fromJSON(e))
        : [],
      groupPolicySeq: isSet(object.groupPolicySeq) ? Long.fromValue(object.groupPolicySeq) : Long.UZERO,
      groupPolicies: globalThis.Array.isArray(object?.groupPolicies)
        ? object.groupPolicies.map((e: any) => GroupPolicyInfo.fromJSON(e))
        : [],
      proposalSeq: isSet(object.proposalSeq) ? Long.fromValue(object.proposalSeq) : Long.UZERO,
      proposals: globalThis.Array.isArray(object?.proposals)
        ? object.proposals.map((e: any) => Proposal.fromJSON(e))
        : [],
      votes: globalThis.Array.isArray(object?.votes) ? object.votes.map((e: any) => Vote.fromJSON(e)) : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (!message.groupSeq.isZero()) {
      obj.groupSeq = (message.groupSeq || Long.UZERO).toString();
    }
    if (message.groups?.length) {
      obj.groups = message.groups.map((e) => GroupInfo.toJSON(e));
    }
    if (message.groupMembers?.length) {
      obj.groupMembers = message.groupMembers.map((e) => GroupMember.toJSON(e));
    }
    if (!message.groupPolicySeq.isZero()) {
      obj.groupPolicySeq = (message.groupPolicySeq || Long.UZERO).toString();
    }
    if (message.groupPolicies?.length) {
      obj.groupPolicies = message.groupPolicies.map((e) => GroupPolicyInfo.toJSON(e));
    }
    if (!message.proposalSeq.isZero()) {
      obj.proposalSeq = (message.proposalSeq || Long.UZERO).toString();
    }
    if (message.proposals?.length) {
      obj.proposals = message.proposals.map((e) => Proposal.toJSON(e));
    }
    if (message.votes?.length) {
      obj.votes = message.votes.map((e) => Vote.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.groupSeq = (object.groupSeq !== undefined && object.groupSeq !== null)
      ? Long.fromValue(object.groupSeq)
      : Long.UZERO;
    message.groups = object.groups?.map((e) => GroupInfo.fromPartial(e)) || [];
    message.groupMembers = object.groupMembers?.map((e) => GroupMember.fromPartial(e)) || [];
    message.groupPolicySeq = (object.groupPolicySeq !== undefined && object.groupPolicySeq !== null)
      ? Long.fromValue(object.groupPolicySeq)
      : Long.UZERO;
    message.groupPolicies = object.groupPolicies?.map((e) => GroupPolicyInfo.fromPartial(e)) || [];
    message.proposalSeq = (object.proposalSeq !== undefined && object.proposalSeq !== null)
      ? Long.fromValue(object.proposalSeq)
      : Long.UZERO;
    message.proposals = object.proposals?.map((e) => Proposal.fromPartial(e)) || [];
    message.votes = object.votes?.map((e) => Vote.fromPartial(e)) || [];
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
