/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { Coin } from "../../base/v1beta1/coin";

export const protobufPackage = "cosmos.gov.v1";

/** Since: cosmos-sdk 0.46 */

/**
 * ProposalType enumerates the valid proposal types.
 * All proposal types are v1.Proposal which have different voting periods or tallying logic.
 */
export enum ProposalType {
  /** PROPOSAL_TYPE_UNSPECIFIED - PROPOSAL_TYPE_UNSPECIFIED defines no proposal type, which fallback to PROPOSAL_TYPE_STANDARD. */
  PROPOSAL_TYPE_UNSPECIFIED = 0,
  /** PROPOSAL_TYPE_STANDARD - PROPOSAL_TYPE_STANDARD defines the type for a standard proposal. */
  PROPOSAL_TYPE_STANDARD = 1,
  /** PROPOSAL_TYPE_MULTIPLE_CHOICE - PROPOSAL_TYPE_MULTIPLE_CHOICE defines the type for a multiple choice proposal. */
  PROPOSAL_TYPE_MULTIPLE_CHOICE = 2,
  /** PROPOSAL_TYPE_OPTIMISTIC - PROPOSAL_TYPE_OPTIMISTIC defines the type for an optimistic proposal. */
  PROPOSAL_TYPE_OPTIMISTIC = 3,
  /** PROPOSAL_TYPE_EXPEDITED - PROPOSAL_TYPE_EXPEDITED defines the type for an expedited proposal. */
  PROPOSAL_TYPE_EXPEDITED = 4,
  UNRECOGNIZED = -1,
}

export function proposalTypeFromJSON(object: any): ProposalType {
  switch (object) {
    case 0:
    case "PROPOSAL_TYPE_UNSPECIFIED":
      return ProposalType.PROPOSAL_TYPE_UNSPECIFIED;
    case 1:
    case "PROPOSAL_TYPE_STANDARD":
      return ProposalType.PROPOSAL_TYPE_STANDARD;
    case 2:
    case "PROPOSAL_TYPE_MULTIPLE_CHOICE":
      return ProposalType.PROPOSAL_TYPE_MULTIPLE_CHOICE;
    case 3:
    case "PROPOSAL_TYPE_OPTIMISTIC":
      return ProposalType.PROPOSAL_TYPE_OPTIMISTIC;
    case 4:
    case "PROPOSAL_TYPE_EXPEDITED":
      return ProposalType.PROPOSAL_TYPE_EXPEDITED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProposalType.UNRECOGNIZED;
  }
}

export function proposalTypeToJSON(object: ProposalType): string {
  switch (object) {
    case ProposalType.PROPOSAL_TYPE_UNSPECIFIED:
      return "PROPOSAL_TYPE_UNSPECIFIED";
    case ProposalType.PROPOSAL_TYPE_STANDARD:
      return "PROPOSAL_TYPE_STANDARD";
    case ProposalType.PROPOSAL_TYPE_MULTIPLE_CHOICE:
      return "PROPOSAL_TYPE_MULTIPLE_CHOICE";
    case ProposalType.PROPOSAL_TYPE_OPTIMISTIC:
      return "PROPOSAL_TYPE_OPTIMISTIC";
    case ProposalType.PROPOSAL_TYPE_EXPEDITED:
      return "PROPOSAL_TYPE_EXPEDITED";
    case ProposalType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** VoteOption enumerates the valid vote options for a given governance proposal. */
export enum VoteOption {
  /** VOTE_OPTION_UNSPECIFIED - VOTE_OPTION_UNSPECIFIED defines a no-op vote option. */
  VOTE_OPTION_UNSPECIFIED = 0,
  /** VOTE_OPTION_ONE - VOTE_OPTION_ONE defines the first proposal vote option. */
  VOTE_OPTION_ONE = 1,
  /** VOTE_OPTION_YES - VOTE_OPTION_YES defines the yes proposal vote option. */
  VOTE_OPTION_YES = 1,
  /** VOTE_OPTION_TWO - VOTE_OPTION_TWO defines the second proposal vote option. */
  VOTE_OPTION_TWO = 2,
  /** VOTE_OPTION_ABSTAIN - VOTE_OPTION_ABSTAIN defines the abstain proposal vote option. */
  VOTE_OPTION_ABSTAIN = 2,
  /** VOTE_OPTION_THREE - VOTE_OPTION_THREE defines the third proposal vote option. */
  VOTE_OPTION_THREE = 3,
  /** VOTE_OPTION_NO - VOTE_OPTION_NO defines the no proposal vote option. */
  VOTE_OPTION_NO = 3,
  /** VOTE_OPTION_FOUR - VOTE_OPTION_FOUR defines the fourth proposal vote option. */
  VOTE_OPTION_FOUR = 4,
  /** VOTE_OPTION_NO_WITH_VETO - VOTE_OPTION_NO_WITH_VETO defines the no with veto proposal vote option. */
  VOTE_OPTION_NO_WITH_VETO = 4,
  /** VOTE_OPTION_SPAM - VOTE_OPTION_SPAM defines the spam proposal vote option. */
  VOTE_OPTION_SPAM = 5,
  UNRECOGNIZED = -1,
}

export function voteOptionFromJSON(object: any): VoteOption {
  switch (object) {
    case 0:
    case "VOTE_OPTION_UNSPECIFIED":
      return VoteOption.VOTE_OPTION_UNSPECIFIED;
    case 1:
    case "VOTE_OPTION_ONE":
      return VoteOption.VOTE_OPTION_ONE;
    case 1:
    case "VOTE_OPTION_YES":
      return VoteOption.VOTE_OPTION_YES;
    case 2:
    case "VOTE_OPTION_TWO":
      return VoteOption.VOTE_OPTION_TWO;
    case 2:
    case "VOTE_OPTION_ABSTAIN":
      return VoteOption.VOTE_OPTION_ABSTAIN;
    case 3:
    case "VOTE_OPTION_THREE":
      return VoteOption.VOTE_OPTION_THREE;
    case 3:
    case "VOTE_OPTION_NO":
      return VoteOption.VOTE_OPTION_NO;
    case 4:
    case "VOTE_OPTION_FOUR":
      return VoteOption.VOTE_OPTION_FOUR;
    case 4:
    case "VOTE_OPTION_NO_WITH_VETO":
      return VoteOption.VOTE_OPTION_NO_WITH_VETO;
    case 5:
    case "VOTE_OPTION_SPAM":
      return VoteOption.VOTE_OPTION_SPAM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return VoteOption.UNRECOGNIZED;
  }
}

export function voteOptionToJSON(object: VoteOption): string {
  switch (object) {
    case VoteOption.VOTE_OPTION_UNSPECIFIED:
      return "VOTE_OPTION_UNSPECIFIED";
    case VoteOption.VOTE_OPTION_ONE:
      return "VOTE_OPTION_ONE";
    case VoteOption.VOTE_OPTION_YES:
      return "VOTE_OPTION_YES";
    case VoteOption.VOTE_OPTION_TWO:
      return "VOTE_OPTION_TWO";
    case VoteOption.VOTE_OPTION_ABSTAIN:
      return "VOTE_OPTION_ABSTAIN";
    case VoteOption.VOTE_OPTION_THREE:
      return "VOTE_OPTION_THREE";
    case VoteOption.VOTE_OPTION_NO:
      return "VOTE_OPTION_NO";
    case VoteOption.VOTE_OPTION_FOUR:
      return "VOTE_OPTION_FOUR";
    case VoteOption.VOTE_OPTION_NO_WITH_VETO:
      return "VOTE_OPTION_NO_WITH_VETO";
    case VoteOption.VOTE_OPTION_SPAM:
      return "VOTE_OPTION_SPAM";
    case VoteOption.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** ProposalStatus enumerates the valid statuses of a proposal. */
export enum ProposalStatus {
  /** PROPOSAL_STATUS_UNSPECIFIED - PROPOSAL_STATUS_UNSPECIFIED defines the default proposal status. */
  PROPOSAL_STATUS_UNSPECIFIED = 0,
  /**
   * PROPOSAL_STATUS_DEPOSIT_PERIOD - PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
   * period.
   */
  PROPOSAL_STATUS_DEPOSIT_PERIOD = 1,
  /**
   * PROPOSAL_STATUS_VOTING_PERIOD - PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
   * period.
   */
  PROPOSAL_STATUS_VOTING_PERIOD = 2,
  /**
   * PROPOSAL_STATUS_PASSED - PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
   * passed.
   */
  PROPOSAL_STATUS_PASSED = 3,
  /**
   * PROPOSAL_STATUS_REJECTED - PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
   * been rejected.
   */
  PROPOSAL_STATUS_REJECTED = 4,
  /**
   * PROPOSAL_STATUS_FAILED - PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
   * failed.
   */
  PROPOSAL_STATUS_FAILED = 5,
  UNRECOGNIZED = -1,
}

export function proposalStatusFromJSON(object: any): ProposalStatus {
  switch (object) {
    case 0:
    case "PROPOSAL_STATUS_UNSPECIFIED":
      return ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED;
    case 1:
    case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
      return ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD;
    case 2:
    case "PROPOSAL_STATUS_VOTING_PERIOD":
      return ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD;
    case 3:
    case "PROPOSAL_STATUS_PASSED":
      return ProposalStatus.PROPOSAL_STATUS_PASSED;
    case 4:
    case "PROPOSAL_STATUS_REJECTED":
      return ProposalStatus.PROPOSAL_STATUS_REJECTED;
    case 5:
    case "PROPOSAL_STATUS_FAILED":
      return ProposalStatus.PROPOSAL_STATUS_FAILED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProposalStatus.UNRECOGNIZED;
  }
}

export function proposalStatusToJSON(object: ProposalStatus): string {
  switch (object) {
    case ProposalStatus.PROPOSAL_STATUS_UNSPECIFIED:
      return "PROPOSAL_STATUS_UNSPECIFIED";
    case ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD:
      return "PROPOSAL_STATUS_DEPOSIT_PERIOD";
    case ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD:
      return "PROPOSAL_STATUS_VOTING_PERIOD";
    case ProposalStatus.PROPOSAL_STATUS_PASSED:
      return "PROPOSAL_STATUS_PASSED";
    case ProposalStatus.PROPOSAL_STATUS_REJECTED:
      return "PROPOSAL_STATUS_REJECTED";
    case ProposalStatus.PROPOSAL_STATUS_FAILED:
      return "PROPOSAL_STATUS_FAILED";
    case ProposalStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** WeightedVoteOption defines a unit of vote for vote split. */
export interface WeightedVoteOption {
  /** option defines the valid vote options, it must not contain duplicate vote options. */
  option: VoteOption;
  /** weight is the vote weight associated with the vote option. */
  weight: string;
}

/**
 * Deposit defines an amount deposited by an account address to an active
 * proposal.
 */
export interface Deposit {
  /** proposal_id defines the unique id of the proposal. */
  proposalId: Long;
  /** depositor defines the deposit addresses from the proposals. */
  depositor: string;
  /** amount to be deposited by depositor. */
  amount: Coin[];
}

/** Proposal defines the core field members of a governance proposal. */
export interface Proposal {
  /** id defines the unique id of the proposal. */
  id: Long;
  /** messages are the arbitrary messages to be executed if the proposal passes. */
  messages: Any[];
  /** status defines the proposal status. */
  status: ProposalStatus;
  /**
   * final_tally_result is the final tally result of the proposal. When
   * querying a proposal via gRPC, this field is not populated until the
   * proposal's voting period has ended.
   */
  finalTallyResult:
    | TallyResult
    | undefined;
  /** submit_time is the time of proposal submission. */
  submitTime:
    | Date
    | undefined;
  /** deposit_end_time is the end time for deposition. */
  depositEndTime:
    | Date
    | undefined;
  /** total_deposit is the total deposit on the proposal. */
  totalDeposit: Coin[];
  /** voting_start_time is the starting time to vote on a proposal. */
  votingStartTime:
    | Date
    | undefined;
  /** voting_end_time is the end time of voting on a proposal. */
  votingEndTime:
    | Date
    | undefined;
  /**
   * metadata is any arbitrary metadata attached to the proposal.
   * the recommended format of the metadata is to be found here:
   * https://docs.cosmos.network/v0.47/modules/gov#proposal-3
   */
  metadata: string;
  /**
   * title is the title of the proposal
   *
   * Since: cosmos-sdk 0.47
   */
  title: string;
  /**
   * summary is a short summary of the proposal
   *
   * Since: cosmos-sdk 0.47
   */
  summary: string;
  /**
   * proposer is the address of the proposal sumbitter
   *
   * Since: cosmos-sdk 0.47
   */
  proposer: string;
  /**
   * expedited defines if the proposal is expedited
   *
   * Since: cosmos-sdk 0.50
   * Deprecated: Use ProposalType instead.
   *
   * @deprecated
   */
  expedited: boolean;
  /**
   * failed_reason defines the reason why the proposal failed
   *
   * Since: cosmos-sdk 0.50
   */
  failedReason: string;
  /**
   * proposal_type defines the type of the proposal
   *
   * Since: x/gov v1.0.0
   */
  proposalType: ProposalType;
}

/**
 * ProposalVoteOptions defines the stringified vote options for proposals.
 * This allows to support multiple choice options for a given proposal.
 *
 * Since: x/gov v1.0.0
 */
export interface ProposalVoteOptions {
  /** option_one is the first option of the proposal */
  optionOne: string;
  /** option_two is the second option of the proposal */
  optionTwo: string;
  /** option_three is the third option of the proposal */
  optionThree: string;
  /** option_four is the fourth option of the proposal */
  optionFour: string;
  /** option_spam is always present for all proposals. */
  optionSpam: string;
}

/** TallyResult defines a standard tally for a governance proposal. */
export interface TallyResult {
  /** yes_count is the number of yes votes on a proposal. */
  yesCount: string;
  /** abstain_count is the number of abstain votes on a proposal. */
  abstainCount: string;
  /** no_count is the number of no votes on a proposal. */
  noCount: string;
  /** no_with_veto_count is the number of no with veto votes on a proposal. */
  noWithVetoCount: string;
  /** spam_count is the number of spam votes on a proposal. */
  spamCount: string;
}

/**
 * Vote defines a vote on a governance proposal.
 * A Vote consists of a proposal ID, the voter, and the vote option.
 */
export interface Vote {
  /** proposal_id defines the unique id of the proposal. */
  proposalId: Long;
  /** voter is the voter address of the proposal. */
  voter: string;
  /** options is the weighted vote options. */
  options: WeightedVoteOption[];
  /**
   * metadata is any arbitrary metadata attached to the vote.
   * the recommended format of the metadata is to be found here: https://docs.cosmos.network/v0.47/modules/gov#vote-5
   */
  metadata: string;
}

/**
 * DepositParams defines the params for deposits on governance proposals.
 *
 * @deprecated
 */
export interface DepositParams {
  /** Minimum deposit for a proposal to enter voting period. */
  minDeposit: Coin[];
  /**
   * Maximum period for Atom holders to deposit on a proposal. Initial value: 2
   * months.
   */
  maxDepositPeriod: Duration | undefined;
}

/**
 * VotingParams defines the params for voting on governance proposals.
 *
 * @deprecated
 */
export interface VotingParams {
  /** Duration of the voting period. */
  votingPeriod: Duration | undefined;
}

/**
 * TallyParams defines the params for tallying votes on governance proposals.
 *
 * @deprecated
 */
export interface TallyParams {
  /**
   * Minimum percentage of total stake needed to vote for a result to be
   * considered valid.
   */
  quorum: string;
  /** Minimum proportion of Yes votes for proposal to pass. Default value: 0.5. */
  threshold: string;
  /**
   * Minimum value of Veto votes to Total votes ratio for proposal to be
   * vetoed. Default value: 1/3.
   */
  vetoThreshold: string;
}

/**
 * Params defines the parameters for the x/gov module.
 *
 * Since: cosmos-sdk 0.47
 */
export interface Params {
  /** Minimum deposit for a proposal to enter voting period. */
  minDeposit: Coin[];
  /**
   * Maximum period for stake holders to deposit on a proposal. Initial value: 2
   * months.
   */
  maxDepositPeriod:
    | Duration
    | undefined;
  /** Duration of the voting period. */
  votingPeriod:
    | Duration
    | undefined;
  /**
   * Minimum percentage of total stake needed to vote for a result to be
   *  considered valid.
   */
  quorum: string;
  /** Minimum proportion of Yes votes for proposal to pass. Default value: 0.5. */
  threshold: string;
  /**
   * Minimum value of Veto votes to Total votes ratio for proposal to be
   *  vetoed. Default value: 1/3.
   */
  vetoThreshold: string;
  /** The ratio representing the proportion of the deposit value that must be paid at proposal submission. */
  minInitialDepositRatio: string;
  /**
   * The cancel ratio which will not be returned back to the depositors when a proposal is cancelled.
   *
   * Since: cosmos-sdk 0.50
   */
  proposalCancelRatio: string;
  /**
   * The address which will receive (proposal_cancel_ratio * deposit) proposal deposits.
   * If empty, the (proposal_cancel_ratio * deposit) proposal deposits will be burned.
   *
   * Since: cosmos-sdk 0.50
   */
  proposalCancelDest: string;
  /**
   * Duration of the voting period of an expedited proposal.
   *
   * Since: cosmos-sdk 0.50
   */
  expeditedVotingPeriod:
    | Duration
    | undefined;
  /**
   * Minimum proportion of Yes votes for proposal to pass. Default value: 0.67.
   *
   * Since: cosmos-sdk 0.50
   */
  expeditedThreshold: string;
  /** Minimum expedited deposit for a proposal to enter voting period. */
  expeditedMinDeposit: Coin[];
  /**
   * burn deposits if a proposal does not meet quorum
   *
   * Since: cosmos-sdk 0.47
   */
  burnVoteQuorum: boolean;
  /**
   * burn deposits if the proposal does not enter voting period
   *
   * Since: cosmos-sdk 0.47
   */
  burnProposalDepositPrevote: boolean;
  /**
   * burn deposits if quorum with vote type no_veto is met
   *
   * Since: cosmos-sdk 0.47
   */
  burnVoteVeto: boolean;
  /**
   * The ratio representing the proportion of the deposit value minimum that must be met when making a deposit.
   * Default value: 0.01. Meaning that for a chain with a min_deposit of 100stake, a deposit of 1stake would be
   * required.
   *
   * Since: cosmos-sdk 0.50
   */
  minDepositRatio: string;
  /**
   * proposal_cancel_max_period defines how far in the voting period a proposer can cancel a proposal.
   * If the proposal is cancelled before the max cancel period, the deposit will be returned/burn to the
   * depositors, according to the proposal_cancel_ratio and proposal_cancel_dest parameters.
   * After the max cancel period, the proposal cannot be cancelled anymore.
   *
   * Since: x/gov v1.0.0
   */
  proposalCancelMaxPeriod: string;
  /**
   * optimistic_authorized_addresses is an optional governance parameter that limits the authorized accounts than can
   * submit optimistic proposals
   *
   * Since: x/gov v1.0.0
   */
  optimisticAuthorizedAddresses: string[];
  /**
   * optimistic rejected threshold defines at which percentage of NO votes, the optimistic proposal should fail and be
   * converted to a standard proposal. The threshold is expressed as a percentage of the total bonded tokens.
   *
   * Since: x/gov v1.0.0
   */
  optimisticRejectedThreshold: string;
  /**
   * yes_quorum defines the minimum percentage of Yes votes in quorum for proposal to pass.
   * Default value: 0 (disabled).
   *
   * Since: x/gov v1.0.0
   */
  yesQuorum: string;
}

/**
 * MessageBasedParams defines the parameters of specific messages in a proposal.
 * It is used to define the parameters of a proposal that is based on a specific message.
 * Once a message has message based params, it only supports a standard proposal type.
 *
 * Since: x/gov v1.0.0
 */
export interface MessageBasedParams {
  /** Duration of the voting period. */
  votingPeriod:
    | Duration
    | undefined;
  /** Minimum percentage of total stake needed to vote for a result to be considered valid. */
  quorum: string;
  /**
   * yes_quorum defines the minimum percentage of Yes votes in quorum for proposal to pass.
   * If zero then the yes_quorum is disabled.
   */
  yesQuorum: string;
  /** Minimum proportion of Yes votes for proposal to pass. */
  threshold: string;
  /** Minimum value of Veto votes to Total votes ratio for proposal to be vetoed. */
  vetoThreshold: string;
}

function createBaseWeightedVoteOption(): WeightedVoteOption {
  return { option: 0, weight: "" };
}

export const WeightedVoteOption = {
  encode(message: WeightedVoteOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.option !== 0) {
      writer.uint32(8).int32(message.option);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WeightedVoteOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWeightedVoteOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.option = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.weight = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WeightedVoteOption {
    return {
      option: isSet(object.option) ? voteOptionFromJSON(object.option) : 0,
      weight: isSet(object.weight) ? globalThis.String(object.weight) : "",
    };
  },

  toJSON(message: WeightedVoteOption): unknown {
    const obj: any = {};
    if (message.option !== 0) {
      obj.option = voteOptionToJSON(message.option);
    }
    if (message.weight !== "") {
      obj.weight = message.weight;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WeightedVoteOption>, I>>(base?: I): WeightedVoteOption {
    return WeightedVoteOption.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WeightedVoteOption>, I>>(object: I): WeightedVoteOption {
    const message = createBaseWeightedVoteOption();
    message.option = object.option ?? 0;
    message.weight = object.weight ?? "";
    return message;
  },
};

function createBaseDeposit(): Deposit {
  return { proposalId: Long.UZERO, depositor: "", amount: [] };
}

export const Deposit = {
  encode(message: Deposit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.depositor !== "") {
      writer.uint32(18).string(message.depositor);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Deposit {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.depositor = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.amount.push(Coin.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Deposit {
    return {
      proposalId: isSet(object.proposalId) ? Long.fromValue(object.proposalId) : Long.UZERO,
      depositor: isSet(object.depositor) ? globalThis.String(object.depositor) : "",
      amount: globalThis.Array.isArray(object?.amount) ? object.amount.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: Deposit): unknown {
    const obj: any = {};
    if (!message.proposalId.isZero()) {
      obj.proposalId = (message.proposalId || Long.UZERO).toString();
    }
    if (message.depositor !== "") {
      obj.depositor = message.depositor;
    }
    if (message.amount?.length) {
      obj.amount = message.amount.map((e) => Coin.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Deposit>, I>>(base?: I): Deposit {
    return Deposit.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Deposit>, I>>(object: I): Deposit {
    const message = createBaseDeposit();
    message.proposalId = (object.proposalId !== undefined && object.proposalId !== null)
      ? Long.fromValue(object.proposalId)
      : Long.UZERO;
    message.depositor = object.depositor ?? "";
    message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProposal(): Proposal {
  return {
    id: Long.UZERO,
    messages: [],
    status: 0,
    finalTallyResult: undefined,
    submitTime: undefined,
    depositEndTime: undefined,
    totalDeposit: [],
    votingStartTime: undefined,
    votingEndTime: undefined,
    metadata: "",
    title: "",
    summary: "",
    proposer: "",
    expedited: false,
    failedReason: "",
    proposalType: 0,
  };
}

export const Proposal = {
  encode(message: Proposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    for (const v of message.messages) {
      Any.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.finalTallyResult !== undefined) {
      TallyResult.encode(message.finalTallyResult, writer.uint32(34).fork()).ldelim();
    }
    if (message.submitTime !== undefined) {
      Timestamp.encode(toTimestamp(message.submitTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.depositEndTime !== undefined) {
      Timestamp.encode(toTimestamp(message.depositEndTime), writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.totalDeposit) {
      Coin.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.votingStartTime !== undefined) {
      Timestamp.encode(toTimestamp(message.votingStartTime), writer.uint32(66).fork()).ldelim();
    }
    if (message.votingEndTime !== undefined) {
      Timestamp.encode(toTimestamp(message.votingEndTime), writer.uint32(74).fork()).ldelim();
    }
    if (message.metadata !== "") {
      writer.uint32(82).string(message.metadata);
    }
    if (message.title !== "") {
      writer.uint32(90).string(message.title);
    }
    if (message.summary !== "") {
      writer.uint32(98).string(message.summary);
    }
    if (message.proposer !== "") {
      writer.uint32(106).string(message.proposer);
    }
    if (message.expedited === true) {
      writer.uint32(112).bool(message.expedited);
    }
    if (message.failedReason !== "") {
      writer.uint32(122).string(message.failedReason);
    }
    if (message.proposalType !== 0) {
      writer.uint32(128).int32(message.proposalType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Proposal {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.messages.push(Any.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.finalTallyResult = TallyResult.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.submitTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.depositEndTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.totalDeposit.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.votingStartTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.votingEndTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.title = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.summary = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.proposer = reader.string();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.expedited = reader.bool();
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.failedReason = reader.string();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.proposalType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Proposal {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO,
      messages: globalThis.Array.isArray(object?.messages) ? object.messages.map((e: any) => Any.fromJSON(e)) : [],
      status: isSet(object.status) ? proposalStatusFromJSON(object.status) : 0,
      finalTallyResult: isSet(object.finalTallyResult) ? TallyResult.fromJSON(object.finalTallyResult) : undefined,
      submitTime: isSet(object.submitTime) ? fromJsonTimestamp(object.submitTime) : undefined,
      depositEndTime: isSet(object.depositEndTime) ? fromJsonTimestamp(object.depositEndTime) : undefined,
      totalDeposit: globalThis.Array.isArray(object?.totalDeposit)
        ? object.totalDeposit.map((e: any) => Coin.fromJSON(e))
        : [],
      votingStartTime: isSet(object.votingStartTime) ? fromJsonTimestamp(object.votingStartTime) : undefined,
      votingEndTime: isSet(object.votingEndTime) ? fromJsonTimestamp(object.votingEndTime) : undefined,
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      summary: isSet(object.summary) ? globalThis.String(object.summary) : "",
      proposer: isSet(object.proposer) ? globalThis.String(object.proposer) : "",
      expedited: isSet(object.expedited) ? globalThis.Boolean(object.expedited) : false,
      failedReason: isSet(object.failedReason) ? globalThis.String(object.failedReason) : "",
      proposalType: isSet(object.proposalType) ? proposalTypeFromJSON(object.proposalType) : 0,
    };
  },

  toJSON(message: Proposal): unknown {
    const obj: any = {};
    if (!message.id.isZero()) {
      obj.id = (message.id || Long.UZERO).toString();
    }
    if (message.messages?.length) {
      obj.messages = message.messages.map((e) => Any.toJSON(e));
    }
    if (message.status !== 0) {
      obj.status = proposalStatusToJSON(message.status);
    }
    if (message.finalTallyResult !== undefined) {
      obj.finalTallyResult = TallyResult.toJSON(message.finalTallyResult);
    }
    if (message.submitTime !== undefined) {
      obj.submitTime = message.submitTime.toISOString();
    }
    if (message.depositEndTime !== undefined) {
      obj.depositEndTime = message.depositEndTime.toISOString();
    }
    if (message.totalDeposit?.length) {
      obj.totalDeposit = message.totalDeposit.map((e) => Coin.toJSON(e));
    }
    if (message.votingStartTime !== undefined) {
      obj.votingStartTime = message.votingStartTime.toISOString();
    }
    if (message.votingEndTime !== undefined) {
      obj.votingEndTime = message.votingEndTime.toISOString();
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.summary !== "") {
      obj.summary = message.summary;
    }
    if (message.proposer !== "") {
      obj.proposer = message.proposer;
    }
    if (message.expedited === true) {
      obj.expedited = message.expedited;
    }
    if (message.failedReason !== "") {
      obj.failedReason = message.failedReason;
    }
    if (message.proposalType !== 0) {
      obj.proposalType = proposalTypeToJSON(message.proposalType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Proposal>, I>>(base?: I): Proposal {
    return Proposal.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Proposal>, I>>(object: I): Proposal {
    const message = createBaseProposal();
    message.id = (object.id !== undefined && object.id !== null) ? Long.fromValue(object.id) : Long.UZERO;
    message.messages = object.messages?.map((e) => Any.fromPartial(e)) || [];
    message.status = object.status ?? 0;
    message.finalTallyResult = (object.finalTallyResult !== undefined && object.finalTallyResult !== null)
      ? TallyResult.fromPartial(object.finalTallyResult)
      : undefined;
    message.submitTime = object.submitTime ?? undefined;
    message.depositEndTime = object.depositEndTime ?? undefined;
    message.totalDeposit = object.totalDeposit?.map((e) => Coin.fromPartial(e)) || [];
    message.votingStartTime = object.votingStartTime ?? undefined;
    message.votingEndTime = object.votingEndTime ?? undefined;
    message.metadata = object.metadata ?? "";
    message.title = object.title ?? "";
    message.summary = object.summary ?? "";
    message.proposer = object.proposer ?? "";
    message.expedited = object.expedited ?? false;
    message.failedReason = object.failedReason ?? "";
    message.proposalType = object.proposalType ?? 0;
    return message;
  },
};

function createBaseProposalVoteOptions(): ProposalVoteOptions {
  return { optionOne: "", optionTwo: "", optionThree: "", optionFour: "", optionSpam: "" };
}

export const ProposalVoteOptions = {
  encode(message: ProposalVoteOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.optionOne !== "") {
      writer.uint32(10).string(message.optionOne);
    }
    if (message.optionTwo !== "") {
      writer.uint32(18).string(message.optionTwo);
    }
    if (message.optionThree !== "") {
      writer.uint32(26).string(message.optionThree);
    }
    if (message.optionFour !== "") {
      writer.uint32(34).string(message.optionFour);
    }
    if (message.optionSpam !== "") {
      writer.uint32(42).string(message.optionSpam);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProposalVoteOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProposalVoteOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.optionOne = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.optionTwo = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.optionThree = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.optionFour = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.optionSpam = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProposalVoteOptions {
    return {
      optionOne: isSet(object.optionOne) ? globalThis.String(object.optionOne) : "",
      optionTwo: isSet(object.optionTwo) ? globalThis.String(object.optionTwo) : "",
      optionThree: isSet(object.optionThree) ? globalThis.String(object.optionThree) : "",
      optionFour: isSet(object.optionFour) ? globalThis.String(object.optionFour) : "",
      optionSpam: isSet(object.optionSpam) ? globalThis.String(object.optionSpam) : "",
    };
  },

  toJSON(message: ProposalVoteOptions): unknown {
    const obj: any = {};
    if (message.optionOne !== "") {
      obj.optionOne = message.optionOne;
    }
    if (message.optionTwo !== "") {
      obj.optionTwo = message.optionTwo;
    }
    if (message.optionThree !== "") {
      obj.optionThree = message.optionThree;
    }
    if (message.optionFour !== "") {
      obj.optionFour = message.optionFour;
    }
    if (message.optionSpam !== "") {
      obj.optionSpam = message.optionSpam;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProposalVoteOptions>, I>>(base?: I): ProposalVoteOptions {
    return ProposalVoteOptions.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProposalVoteOptions>, I>>(object: I): ProposalVoteOptions {
    const message = createBaseProposalVoteOptions();
    message.optionOne = object.optionOne ?? "";
    message.optionTwo = object.optionTwo ?? "";
    message.optionThree = object.optionThree ?? "";
    message.optionFour = object.optionFour ?? "";
    message.optionSpam = object.optionSpam ?? "";
    return message;
  },
};

function createBaseTallyResult(): TallyResult {
  return { yesCount: "", abstainCount: "", noCount: "", noWithVetoCount: "", spamCount: "" };
}

export const TallyResult = {
  encode(message: TallyResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.yesCount !== "") {
      writer.uint32(10).string(message.yesCount);
    }
    if (message.abstainCount !== "") {
      writer.uint32(18).string(message.abstainCount);
    }
    if (message.noCount !== "") {
      writer.uint32(26).string(message.noCount);
    }
    if (message.noWithVetoCount !== "") {
      writer.uint32(34).string(message.noWithVetoCount);
    }
    if (message.spamCount !== "") {
      writer.uint32(42).string(message.spamCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TallyResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTallyResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.yesCount = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.abstainCount = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.noCount = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.noWithVetoCount = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.spamCount = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TallyResult {
    return {
      yesCount: isSet(object.yesCount) ? globalThis.String(object.yesCount) : "",
      abstainCount: isSet(object.abstainCount) ? globalThis.String(object.abstainCount) : "",
      noCount: isSet(object.noCount) ? globalThis.String(object.noCount) : "",
      noWithVetoCount: isSet(object.noWithVetoCount) ? globalThis.String(object.noWithVetoCount) : "",
      spamCount: isSet(object.spamCount) ? globalThis.String(object.spamCount) : "",
    };
  },

  toJSON(message: TallyResult): unknown {
    const obj: any = {};
    if (message.yesCount !== "") {
      obj.yesCount = message.yesCount;
    }
    if (message.abstainCount !== "") {
      obj.abstainCount = message.abstainCount;
    }
    if (message.noCount !== "") {
      obj.noCount = message.noCount;
    }
    if (message.noWithVetoCount !== "") {
      obj.noWithVetoCount = message.noWithVetoCount;
    }
    if (message.spamCount !== "") {
      obj.spamCount = message.spamCount;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TallyResult>, I>>(base?: I): TallyResult {
    return TallyResult.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TallyResult>, I>>(object: I): TallyResult {
    const message = createBaseTallyResult();
    message.yesCount = object.yesCount ?? "";
    message.abstainCount = object.abstainCount ?? "";
    message.noCount = object.noCount ?? "";
    message.noWithVetoCount = object.noWithVetoCount ?? "";
    message.spamCount = object.spamCount ?? "";
    return message;
  },
};

function createBaseVote(): Vote {
  return { proposalId: Long.UZERO, voter: "", options: [], metadata: "" };
}

export const Vote = {
  encode(message: Vote, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.proposalId.isZero()) {
      writer.uint32(8).uint64(message.proposalId);
    }
    if (message.voter !== "") {
      writer.uint32(18).string(message.voter);
    }
    for (const v of message.options) {
      WeightedVoteOption.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.metadata !== "") {
      writer.uint32(42).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Vote {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVote();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proposalId = reader.uint64() as Long;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.voter = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.options.push(WeightedVoteOption.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.metadata = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Vote {
    return {
      proposalId: isSet(object.proposalId) ? Long.fromValue(object.proposalId) : Long.UZERO,
      voter: isSet(object.voter) ? globalThis.String(object.voter) : "",
      options: globalThis.Array.isArray(object?.options)
        ? object.options.map((e: any) => WeightedVoteOption.fromJSON(e))
        : [],
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
    };
  },

  toJSON(message: Vote): unknown {
    const obj: any = {};
    if (!message.proposalId.isZero()) {
      obj.proposalId = (message.proposalId || Long.UZERO).toString();
    }
    if (message.voter !== "") {
      obj.voter = message.voter;
    }
    if (message.options?.length) {
      obj.options = message.options.map((e) => WeightedVoteOption.toJSON(e));
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Vote>, I>>(base?: I): Vote {
    return Vote.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Vote>, I>>(object: I): Vote {
    const message = createBaseVote();
    message.proposalId = (object.proposalId !== undefined && object.proposalId !== null)
      ? Long.fromValue(object.proposalId)
      : Long.UZERO;
    message.voter = object.voter ?? "";
    message.options = object.options?.map((e) => WeightedVoteOption.fromPartial(e)) || [];
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseDepositParams(): DepositParams {
  return { minDeposit: [], maxDepositPeriod: undefined };
}

export const DepositParams = {
  encode(message: DepositParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.minDeposit) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxDepositPeriod !== undefined) {
      Duration.encode(message.maxDepositPeriod, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DepositParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDepositParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.minDeposit.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.maxDepositPeriod = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DepositParams {
    return {
      minDeposit: globalThis.Array.isArray(object?.minDeposit)
        ? object.minDeposit.map((e: any) => Coin.fromJSON(e))
        : [],
      maxDepositPeriod: isSet(object.maxDepositPeriod) ? Duration.fromJSON(object.maxDepositPeriod) : undefined,
    };
  },

  toJSON(message: DepositParams): unknown {
    const obj: any = {};
    if (message.minDeposit?.length) {
      obj.minDeposit = message.minDeposit.map((e) => Coin.toJSON(e));
    }
    if (message.maxDepositPeriod !== undefined) {
      obj.maxDepositPeriod = Duration.toJSON(message.maxDepositPeriod);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DepositParams>, I>>(base?: I): DepositParams {
    return DepositParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DepositParams>, I>>(object: I): DepositParams {
    const message = createBaseDepositParams();
    message.minDeposit = object.minDeposit?.map((e) => Coin.fromPartial(e)) || [];
    message.maxDepositPeriod = (object.maxDepositPeriod !== undefined && object.maxDepositPeriod !== null)
      ? Duration.fromPartial(object.maxDepositPeriod)
      : undefined;
    return message;
  },
};

function createBaseVotingParams(): VotingParams {
  return { votingPeriod: undefined };
}

export const VotingParams = {
  encode(message: VotingParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.votingPeriod !== undefined) {
      Duration.encode(message.votingPeriod, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VotingParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVotingParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.votingPeriod = Duration.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VotingParams {
    return { votingPeriod: isSet(object.votingPeriod) ? Duration.fromJSON(object.votingPeriod) : undefined };
  },

  toJSON(message: VotingParams): unknown {
    const obj: any = {};
    if (message.votingPeriod !== undefined) {
      obj.votingPeriod = Duration.toJSON(message.votingPeriod);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VotingParams>, I>>(base?: I): VotingParams {
    return VotingParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VotingParams>, I>>(object: I): VotingParams {
    const message = createBaseVotingParams();
    message.votingPeriod = (object.votingPeriod !== undefined && object.votingPeriod !== null)
      ? Duration.fromPartial(object.votingPeriod)
      : undefined;
    return message;
  },
};

function createBaseTallyParams(): TallyParams {
  return { quorum: "", threshold: "", vetoThreshold: "" };
}

export const TallyParams = {
  encode(message: TallyParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.quorum !== "") {
      writer.uint32(10).string(message.quorum);
    }
    if (message.threshold !== "") {
      writer.uint32(18).string(message.threshold);
    }
    if (message.vetoThreshold !== "") {
      writer.uint32(26).string(message.vetoThreshold);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TallyParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTallyParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.quorum = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.threshold = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.vetoThreshold = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TallyParams {
    return {
      quorum: isSet(object.quorum) ? globalThis.String(object.quorum) : "",
      threshold: isSet(object.threshold) ? globalThis.String(object.threshold) : "",
      vetoThreshold: isSet(object.vetoThreshold) ? globalThis.String(object.vetoThreshold) : "",
    };
  },

  toJSON(message: TallyParams): unknown {
    const obj: any = {};
    if (message.quorum !== "") {
      obj.quorum = message.quorum;
    }
    if (message.threshold !== "") {
      obj.threshold = message.threshold;
    }
    if (message.vetoThreshold !== "") {
      obj.vetoThreshold = message.vetoThreshold;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TallyParams>, I>>(base?: I): TallyParams {
    return TallyParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TallyParams>, I>>(object: I): TallyParams {
    const message = createBaseTallyParams();
    message.quorum = object.quorum ?? "";
    message.threshold = object.threshold ?? "";
    message.vetoThreshold = object.vetoThreshold ?? "";
    return message;
  },
};

function createBaseParams(): Params {
  return {
    minDeposit: [],
    maxDepositPeriod: undefined,
    votingPeriod: undefined,
    quorum: "",
    threshold: "",
    vetoThreshold: "",
    minInitialDepositRatio: "",
    proposalCancelRatio: "",
    proposalCancelDest: "",
    expeditedVotingPeriod: undefined,
    expeditedThreshold: "",
    expeditedMinDeposit: [],
    burnVoteQuorum: false,
    burnProposalDepositPrevote: false,
    burnVoteVeto: false,
    minDepositRatio: "",
    proposalCancelMaxPeriod: "",
    optimisticAuthorizedAddresses: [],
    optimisticRejectedThreshold: "",
    yesQuorum: "",
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.minDeposit) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.maxDepositPeriod !== undefined) {
      Duration.encode(message.maxDepositPeriod, writer.uint32(18).fork()).ldelim();
    }
    if (message.votingPeriod !== undefined) {
      Duration.encode(message.votingPeriod, writer.uint32(26).fork()).ldelim();
    }
    if (message.quorum !== "") {
      writer.uint32(34).string(message.quorum);
    }
    if (message.threshold !== "") {
      writer.uint32(42).string(message.threshold);
    }
    if (message.vetoThreshold !== "") {
      writer.uint32(50).string(message.vetoThreshold);
    }
    if (message.minInitialDepositRatio !== "") {
      writer.uint32(58).string(message.minInitialDepositRatio);
    }
    if (message.proposalCancelRatio !== "") {
      writer.uint32(66).string(message.proposalCancelRatio);
    }
    if (message.proposalCancelDest !== "") {
      writer.uint32(74).string(message.proposalCancelDest);
    }
    if (message.expeditedVotingPeriod !== undefined) {
      Duration.encode(message.expeditedVotingPeriod, writer.uint32(82).fork()).ldelim();
    }
    if (message.expeditedThreshold !== "") {
      writer.uint32(90).string(message.expeditedThreshold);
    }
    for (const v of message.expeditedMinDeposit) {
      Coin.encode(v!, writer.uint32(98).fork()).ldelim();
    }
    if (message.burnVoteQuorum === true) {
      writer.uint32(104).bool(message.burnVoteQuorum);
    }
    if (message.burnProposalDepositPrevote === true) {
      writer.uint32(112).bool(message.burnProposalDepositPrevote);
    }
    if (message.burnVoteVeto === true) {
      writer.uint32(120).bool(message.burnVoteVeto);
    }
    if (message.minDepositRatio !== "") {
      writer.uint32(130).string(message.minDepositRatio);
    }
    if (message.proposalCancelMaxPeriod !== "") {
      writer.uint32(138).string(message.proposalCancelMaxPeriod);
    }
    for (const v of message.optimisticAuthorizedAddresses) {
      writer.uint32(146).string(v!);
    }
    if (message.optimisticRejectedThreshold !== "") {
      writer.uint32(154).string(message.optimisticRejectedThreshold);
    }
    if (message.yesQuorum !== "") {
      writer.uint32(162).string(message.yesQuorum);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.minDeposit.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.maxDepositPeriod = Duration.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.votingPeriod = Duration.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.quorum = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.threshold = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.vetoThreshold = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.minInitialDepositRatio = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.proposalCancelRatio = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.proposalCancelDest = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.expeditedVotingPeriod = Duration.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.expeditedThreshold = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.expeditedMinDeposit.push(Coin.decode(reader, reader.uint32()));
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.burnVoteQuorum = reader.bool();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.burnProposalDepositPrevote = reader.bool();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.burnVoteVeto = reader.bool();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.minDepositRatio = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.proposalCancelMaxPeriod = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.optimisticAuthorizedAddresses.push(reader.string());
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.optimisticRejectedThreshold = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.yesQuorum = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      minDeposit: globalThis.Array.isArray(object?.minDeposit)
        ? object.minDeposit.map((e: any) => Coin.fromJSON(e))
        : [],
      maxDepositPeriod: isSet(object.maxDepositPeriod) ? Duration.fromJSON(object.maxDepositPeriod) : undefined,
      votingPeriod: isSet(object.votingPeriod) ? Duration.fromJSON(object.votingPeriod) : undefined,
      quorum: isSet(object.quorum) ? globalThis.String(object.quorum) : "",
      threshold: isSet(object.threshold) ? globalThis.String(object.threshold) : "",
      vetoThreshold: isSet(object.vetoThreshold) ? globalThis.String(object.vetoThreshold) : "",
      minInitialDepositRatio: isSet(object.minInitialDepositRatio)
        ? globalThis.String(object.minInitialDepositRatio)
        : "",
      proposalCancelRatio: isSet(object.proposalCancelRatio) ? globalThis.String(object.proposalCancelRatio) : "",
      proposalCancelDest: isSet(object.proposalCancelDest) ? globalThis.String(object.proposalCancelDest) : "",
      expeditedVotingPeriod: isSet(object.expeditedVotingPeriod)
        ? Duration.fromJSON(object.expeditedVotingPeriod)
        : undefined,
      expeditedThreshold: isSet(object.expeditedThreshold) ? globalThis.String(object.expeditedThreshold) : "",
      expeditedMinDeposit: globalThis.Array.isArray(object?.expeditedMinDeposit)
        ? object.expeditedMinDeposit.map((e: any) => Coin.fromJSON(e))
        : [],
      burnVoteQuorum: isSet(object.burnVoteQuorum) ? globalThis.Boolean(object.burnVoteQuorum) : false,
      burnProposalDepositPrevote: isSet(object.burnProposalDepositPrevote)
        ? globalThis.Boolean(object.burnProposalDepositPrevote)
        : false,
      burnVoteVeto: isSet(object.burnVoteVeto) ? globalThis.Boolean(object.burnVoteVeto) : false,
      minDepositRatio: isSet(object.minDepositRatio) ? globalThis.String(object.minDepositRatio) : "",
      proposalCancelMaxPeriod: isSet(object.proposalCancelMaxPeriod)
        ? globalThis.String(object.proposalCancelMaxPeriod)
        : "",
      optimisticAuthorizedAddresses: globalThis.Array.isArray(object?.optimisticAuthorizedAddresses)
        ? object.optimisticAuthorizedAddresses.map((e: any) => globalThis.String(e))
        : [],
      optimisticRejectedThreshold: isSet(object.optimisticRejectedThreshold)
        ? globalThis.String(object.optimisticRejectedThreshold)
        : "",
      yesQuorum: isSet(object.yesQuorum) ? globalThis.String(object.yesQuorum) : "",
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.minDeposit?.length) {
      obj.minDeposit = message.minDeposit.map((e) => Coin.toJSON(e));
    }
    if (message.maxDepositPeriod !== undefined) {
      obj.maxDepositPeriod = Duration.toJSON(message.maxDepositPeriod);
    }
    if (message.votingPeriod !== undefined) {
      obj.votingPeriod = Duration.toJSON(message.votingPeriod);
    }
    if (message.quorum !== "") {
      obj.quorum = message.quorum;
    }
    if (message.threshold !== "") {
      obj.threshold = message.threshold;
    }
    if (message.vetoThreshold !== "") {
      obj.vetoThreshold = message.vetoThreshold;
    }
    if (message.minInitialDepositRatio !== "") {
      obj.minInitialDepositRatio = message.minInitialDepositRatio;
    }
    if (message.proposalCancelRatio !== "") {
      obj.proposalCancelRatio = message.proposalCancelRatio;
    }
    if (message.proposalCancelDest !== "") {
      obj.proposalCancelDest = message.proposalCancelDest;
    }
    if (message.expeditedVotingPeriod !== undefined) {
      obj.expeditedVotingPeriod = Duration.toJSON(message.expeditedVotingPeriod);
    }
    if (message.expeditedThreshold !== "") {
      obj.expeditedThreshold = message.expeditedThreshold;
    }
    if (message.expeditedMinDeposit?.length) {
      obj.expeditedMinDeposit = message.expeditedMinDeposit.map((e) => Coin.toJSON(e));
    }
    if (message.burnVoteQuorum === true) {
      obj.burnVoteQuorum = message.burnVoteQuorum;
    }
    if (message.burnProposalDepositPrevote === true) {
      obj.burnProposalDepositPrevote = message.burnProposalDepositPrevote;
    }
    if (message.burnVoteVeto === true) {
      obj.burnVoteVeto = message.burnVoteVeto;
    }
    if (message.minDepositRatio !== "") {
      obj.minDepositRatio = message.minDepositRatio;
    }
    if (message.proposalCancelMaxPeriod !== "") {
      obj.proposalCancelMaxPeriod = message.proposalCancelMaxPeriod;
    }
    if (message.optimisticAuthorizedAddresses?.length) {
      obj.optimisticAuthorizedAddresses = message.optimisticAuthorizedAddresses;
    }
    if (message.optimisticRejectedThreshold !== "") {
      obj.optimisticRejectedThreshold = message.optimisticRejectedThreshold;
    }
    if (message.yesQuorum !== "") {
      obj.yesQuorum = message.yesQuorum;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Params>, I>>(base?: I): Params {
    return Params.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.minDeposit = object.minDeposit?.map((e) => Coin.fromPartial(e)) || [];
    message.maxDepositPeriod = (object.maxDepositPeriod !== undefined && object.maxDepositPeriod !== null)
      ? Duration.fromPartial(object.maxDepositPeriod)
      : undefined;
    message.votingPeriod = (object.votingPeriod !== undefined && object.votingPeriod !== null)
      ? Duration.fromPartial(object.votingPeriod)
      : undefined;
    message.quorum = object.quorum ?? "";
    message.threshold = object.threshold ?? "";
    message.vetoThreshold = object.vetoThreshold ?? "";
    message.minInitialDepositRatio = object.minInitialDepositRatio ?? "";
    message.proposalCancelRatio = object.proposalCancelRatio ?? "";
    message.proposalCancelDest = object.proposalCancelDest ?? "";
    message.expeditedVotingPeriod =
      (object.expeditedVotingPeriod !== undefined && object.expeditedVotingPeriod !== null)
        ? Duration.fromPartial(object.expeditedVotingPeriod)
        : undefined;
    message.expeditedThreshold = object.expeditedThreshold ?? "";
    message.expeditedMinDeposit = object.expeditedMinDeposit?.map((e) => Coin.fromPartial(e)) || [];
    message.burnVoteQuorum = object.burnVoteQuorum ?? false;
    message.burnProposalDepositPrevote = object.burnProposalDepositPrevote ?? false;
    message.burnVoteVeto = object.burnVoteVeto ?? false;
    message.minDepositRatio = object.minDepositRatio ?? "";
    message.proposalCancelMaxPeriod = object.proposalCancelMaxPeriod ?? "";
    message.optimisticAuthorizedAddresses = object.optimisticAuthorizedAddresses?.map((e) => e) || [];
    message.optimisticRejectedThreshold = object.optimisticRejectedThreshold ?? "";
    message.yesQuorum = object.yesQuorum ?? "";
    return message;
  },
};

function createBaseMessageBasedParams(): MessageBasedParams {
  return { votingPeriod: undefined, quorum: "", yesQuorum: "", threshold: "", vetoThreshold: "" };
}

export const MessageBasedParams = {
  encode(message: MessageBasedParams, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.votingPeriod !== undefined) {
      Duration.encode(message.votingPeriod, writer.uint32(10).fork()).ldelim();
    }
    if (message.quorum !== "") {
      writer.uint32(18).string(message.quorum);
    }
    if (message.yesQuorum !== "") {
      writer.uint32(162).string(message.yesQuorum);
    }
    if (message.threshold !== "") {
      writer.uint32(26).string(message.threshold);
    }
    if (message.vetoThreshold !== "") {
      writer.uint32(34).string(message.vetoThreshold);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageBasedParams {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageBasedParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.votingPeriod = Duration.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.quorum = reader.string();
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }

          message.yesQuorum = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.threshold = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.vetoThreshold = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MessageBasedParams {
    return {
      votingPeriod: isSet(object.votingPeriod) ? Duration.fromJSON(object.votingPeriod) : undefined,
      quorum: isSet(object.quorum) ? globalThis.String(object.quorum) : "",
      yesQuorum: isSet(object.yesQuorum) ? globalThis.String(object.yesQuorum) : "",
      threshold: isSet(object.threshold) ? globalThis.String(object.threshold) : "",
      vetoThreshold: isSet(object.vetoThreshold) ? globalThis.String(object.vetoThreshold) : "",
    };
  },

  toJSON(message: MessageBasedParams): unknown {
    const obj: any = {};
    if (message.votingPeriod !== undefined) {
      obj.votingPeriod = Duration.toJSON(message.votingPeriod);
    }
    if (message.quorum !== "") {
      obj.quorum = message.quorum;
    }
    if (message.yesQuorum !== "") {
      obj.yesQuorum = message.yesQuorum;
    }
    if (message.threshold !== "") {
      obj.threshold = message.threshold;
    }
    if (message.vetoThreshold !== "") {
      obj.vetoThreshold = message.vetoThreshold;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MessageBasedParams>, I>>(base?: I): MessageBasedParams {
    return MessageBasedParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MessageBasedParams>, I>>(object: I): MessageBasedParams {
    const message = createBaseMessageBasedParams();
    message.votingPeriod = (object.votingPeriod !== undefined && object.votingPeriod !== null)
      ? Duration.fromPartial(object.votingPeriod)
      : undefined;
    message.quorum = object.quorum ?? "";
    message.yesQuorum = object.yesQuorum ?? "";
    message.threshold = object.threshold ?? "";
    message.vetoThreshold = object.vetoThreshold ?? "";
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
