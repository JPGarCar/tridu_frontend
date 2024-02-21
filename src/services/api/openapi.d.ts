import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        /**
         * BulkCreateResponseSchema
         * Schema for bulk create response, allows server to respond with items created,
         * and errors limiting specific instances from being created.
         */
        export interface BulkCreateResponseSchema {
            /**
             * Created
             */
            created: number;
            /**
             * Duplicates
             */
            duplicates: number;
            /**
             * Errors
             */
            errors: string[];
            /**
             * Message
             */
            message: string;
            /**
             * Items
             */
            items: string[];
        }
        /**
         * CreateHeatSchema
         */
        export interface CreateHeatSchema {
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Termination
             */
            termination: string;
            /**
             * Start Datetime
             */
            start_datetime: string; // date-time
            /**
             * HEX Color Code
             * Color hex code with #
             */
            color?: /**
             * HEX Color Code
             * Color hex code with #
             */
            string | null;
            /**
             * Ideal Capacity
             */
            ideal_capacity?: /* Ideal Capacity */ number | null;
            /**
             * Pool
             */
            pool?: string;
            /**
             * Race
             */
            race_id: number;
            /**
             * Race Type
             */
            race_type_id: number;
        }
        /**
         * CreateParticipantBulkSchema
         */
        export interface CreateParticipantBulkSchema {
            /**
             * City
             */
            city?: /* City */ string | null;
            /**
             * Country
             */
            country?: /* Country */ string | null;
            /**
             * Province
             */
            province?: /* Province */ string | null;
            /**
             * Swim Time
             */
            swim_time?: /* Swim Time */ string | null;
            /**
             * Bib Number
             */
            bib_number: number;
            /**
             * Is First Time Triathlete
             */
            is_ftt?: boolean;
            /**
             * Team Name
             */
            team?: /* Team Name */ string | null;
            /**
             * Race
             */
            race_id: number;
            /**
             * Race Type
             */
            race_type_id: number;
            /**
             * User
             */
            user_id: number;
            /**
             * Location
             */
            location?: /* Location */ string | null;
        }
        /**
         * CreateParticipantSchema
         */
        export interface CreateParticipantSchema {
            origin?: /* LocationSchema */ LocationSchema | null;
            /**
             * Bib Number
             */
            bib_number: number;
            /**
             * Is First Time Triathlete
             */
            is_ftt?: boolean;
            /**
             * Team Name
             */
            team?: /* Team Name */ string | null;
            /**
             * Swim Time
             */
            swim_time?: /* Swim Time */ string /* duration */ | null;
            /**
             * Race
             */
            race_id: number;
            /**
             * Race Type
             */
            race_type_id: number;
            /**
             * Location
             */
            location?: /* Location */ string | null;
        }
        /**
         * CreateRaceSchema
         */
        export interface CreateRaceSchema {
            /**
             * Name
             */
            name: string;
        }
        /**
         * CreateRaceTypeSchema
         */
        export interface CreateRaceTypeSchema {
            /**
             * Name
             */
            name: string;
            /**
             * Participants Allowed
             */
            participants_allowed?: number;
            /**
             * Ftt Allowed
             */
            ftt_allowed?: number;
        }
        /**
         * CreateUserSchema
         */
        export interface CreateUserSchema {
            /**
             * First Name
             */
            first_name?: /* First Name */ string | null;
            /**
             * Last Name
             */
            last_name?: /* Last Name */ string | null;
            /**
             * Email Address
             */
            email?: /* Email Address */ string | null;
            /**
             * Phone Number
             */
            phone_number?: /* Phone Number */ string | null;
            /**
             * Date Of Birth
             */
            date_of_birth?: /* Date Of Birth */ string /* date */ | null;
            /**
             * Gender
             */
            gender?: string;
        }
        /**
         * ErrorObjectSchema
         * Schema for the error object as described in decisions_api.md
         */
        export interface ErrorObjectSchema {
            /**
             * Title
             */
            title: string;
            /**
             * Status
             */
            status: number;
            /**
             * Details
             */
            details: string;
        }
        /**
         * HeatSchema
         */
        export interface HeatSchema {
            race_type: /* RaceTypeSchema */ RaceTypeSchema;
            race: /* RaceSchema */ RaceSchema;
            /**
             * Name
             */
            name: string;
            /**
             * Participant Count
             */
            participant_count: number;
            /**
             * Avg Swim Time
             */
            avg_swim_time: string; // duration
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Termination
             */
            termination: string;
            /**
             * Start Datetime
             */
            start_datetime: string; // date-time
            /**
             * HEX Color Code
             * Color hex code with #
             */
            color: string;
            /**
             * Ideal Capacity
             */
            ideal_capacity?: number;
            /**
             * Pool
             */
            pool?: string;
        }
        /**
         * Input
         */
        export interface Input {
            /**
             * Limit
             */
            limit?: number;
            /**
             * Offset
             */
            offset?: number;
        }
        /**
         * LocationSchema
         */
        export interface LocationSchema {
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * City
             */
            city: string;
            /**
             * Province
             */
            province: string;
            /**
             * Country
             */
            country: string;
        }
        /**
         * PagedParticipantSchema
         */
        export interface PagedParticipantSchema {
            /**
             * Items
             */
            items: /* ParticipantSchema */ ParticipantSchema[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * PagedUserSchema
         */
        export interface PagedUserSchema {
            /**
             * Items
             */
            items: /* UserSchema */ UserSchema[];
            /**
             * Count
             */
            count: number;
        }
        /**
         * ParticipantCommentCreateSchema
         */
        export interface ParticipantCommentCreateSchema {
            /**
             * Comment
             */
            comment: string;
        }
        /**
         * ParticipantCommentSchema
         */
        export interface ParticipantCommentSchema {
            /**
             * Writer Name
             */
            writer_name?: string;
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Participant
             */
            participant: number;
            /**
             * Comment
             */
            comment: string;
            /**
             * Creation Date
             */
            creation_date: string; // date-time
        }
        /**
         * ParticipantSchema
         */
        export interface ParticipantSchema {
            origin?: /* LocationSchema */ LocationSchema | null;
            race: /* RaceSchema */ RaceSchema;
            race_type: /* RaceTypeSchema */ RaceTypeSchema;
            heat?: /* HeatSchema */ HeatSchema | null;
            user: /* UserSchema */ UserSchema;
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Bib Number
             */
            bib_number: number;
            /**
             * Is First Time Triathlete
             */
            is_ftt?: boolean;
            /**
             * Team Name
             */
            team?: /* Team Name */ string | null;
            /**
             * Swim Time
             */
            swim_time?: /* Swim Time */ string /* duration */ | null;
            /**
             * Date Changed
             */
            date_changed: string; // date-time
            /**
             * Is Active
             */
            is_active?: boolean;
            /**
             * Location
             */
            location?: /* Location */ string | null;
        }
        /**
         * PatchHeatSchema
         */
        export interface PatchHeatSchema {
            /**
             * Termination
             */
            termination: string;
            /**
             * Start Datetime
             */
            start_datetime: string; // date-time
            /**
             * HEX Color Code
             * Color hex code with #
             */
            color: string;
            /**
             * Ideal Capacity
             */
            ideal_capacity?: number;
            /**
             * Pool
             */
            pool?: string;
        }
        /**
         * PatchParticipantSchema
         */
        export interface PatchParticipantSchema {
            origin?: /* LocationSchema */ LocationSchema | null;
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Bib Number
             */
            bib_number?: /* Bib Number */ number | null;
            /**
             * Is First Time Triathlete
             */
            is_ftt?: /* Is First Time Triathlete */ boolean | null;
            /**
             * Team Name
             */
            team?: /* Team Name */ string | null;
            /**
             * Swim Time
             */
            swim_time?: /* Swim Time */ string /* duration */ | null;
            /**
             * Location
             */
            location?: /* Location */ string | null;
        }
        /**
         * PatchUserSchema
         */
        export interface PatchUserSchema {
            /**
             * First Name
             */
            first_name?: /* First Name */ string | null;
            /**
             * Last Name
             */
            last_name?: /* Last Name */ string | null;
            /**
             * Email Address
             */
            email?: /* Email Address */ string | null;
            /**
             * Phone Number
             */
            phone_number?: /* Phone Number */ string | null;
            /**
             * Date Of Birth
             */
            date_of_birth?: /* Date Of Birth */ string /* date */ | null;
            /**
             * Gender
             */
            gender?: /* Gender */ string | null;
        }
        /**
         * RaceSchema
         */
        export interface RaceSchema {
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Name
             */
            name: string;
            /**
             * Date Created
             */
            date_created: string; // date-time
        }
        /**
         * RaceTypeSchema
         */
        export interface RaceTypeSchema {
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Name
             */
            name: string;
            /**
             * Participants Allowed
             */
            participants_allowed?: number;
            /**
             * Ftt Allowed
             */
            ftt_allowed?: number;
        }
        /**
         * RaceTypeStatSchema
         */
        export interface RaceTypeStatSchema {
            race_type: /* RaceTypeSchema */ RaceTypeSchema;
            /**
             * Registered
             */
            registered: number;
            /**
             * Allowed
             */
            allowed: number;
            /**
             * Ftt Registered
             */
            ftt_registered: number;
            /**
             * Ftt Allowed
             */
            ftt_allowed: number;
        }
        /**
         * UserSchema
         */
        export interface UserSchema {
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Username
             * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
             */
            username: string;
            /**
             * First Name
             */
            first_name?: /* First Name */ string | null;
            /**
             * Last Name
             */
            last_name?: /* Last Name */ string | null;
            /**
             * Email Address
             */
            email?: /* Email Address */ string | null;
            /**
             * Phone Number
             */
            phone_number?: /* Phone Number */ string | null;
            /**
             * Date Of Birth
             */
            date_of_birth?: /* Date Of Birth */ string /* date */ | null;
            /**
             * Active
             * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
             */
            is_active?: boolean;
            /**
             * Gender
             */
            gender?: string;
            /**
             * Staff Status
             * Designates whether the user can log into this admin site.
             */
            is_staff?: boolean;
            /**
             * Superuser Status
             * Designates that this user has all permissions without explicitly assigning them.
             */
            is_superuser?: boolean;
        }
    }
}
declare namespace Paths {
    namespace AccountsApiAdminActionCleanGender {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = string;
            export type $403 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace AccountsApiCreateUser {
        export type RequestBody = /* CreateUserSchema */ Components.Schemas.CreateUserSchema;
        namespace Responses {
            export type $200 = /* UserSchema */ Components.Schemas.UserSchema;
            export type $201 = /* UserSchema */ Components.Schemas.UserSchema;
        }
    }
    namespace AccountsApiCreateUsersBulk {
        /**
         * Userschemas
         */
        export type RequestBody = /* CreateUserSchema */ Components.Schemas.CreateUserSchema[];
        namespace Responses {
            export type $201 = /**
             * BulkCreateResponseSchema
             * Schema for bulk create response, allows server to respond with items created,
             * and errors limiting specific instances from being created.
             */
            Components.Schemas.BulkCreateResponseSchema;
        }
    }
    namespace AccountsApiGetActiveNonStaffUsers {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Name
             */
            export type Name = string;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface QueryParameters {
            name?: /* Name */ Parameters.Name;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedUserSchema */ Components.Schemas.PagedUserSchema;
        }
    }
    namespace AccountsApiGetUserById {
        namespace Parameters {
            /**
             * User Id
             */
            export type UserId = number;
        }
        export interface PathParameters {
            user_id: /* User Id */ Parameters.UserId;
        }
        namespace Responses {
            export type $200 = /* UserSchema */ Components.Schemas.UserSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace AccountsApiGetUserByUsername {
        namespace Parameters {
            /**
             * Username
             */
            export type Username = string;
        }
        export interface PathParameters {
            username: /* Username */ Parameters.Username;
        }
        namespace Responses {
            export type $200 = /* UserSchema */ Components.Schemas.UserSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace AccountsApiUpdateUser {
        namespace Parameters {
            /**
             * User Id
             */
            export type UserId = number;
        }
        export interface PathParameters {
            user_id: /* User Id */ Parameters.UserId;
        }
        export type RequestBody = /* PatchUserSchema */ Components.Schemas.PatchUserSchema;
        namespace Responses {
            export type $201 = /* UserSchema */ Components.Schemas.UserSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace HeatsApiCreateHeat {
        export type RequestBody = /* CreateHeatSchema */ Components.Schemas.CreateHeatSchema;
        namespace Responses {
            export type $200 = /* HeatSchema */ Components.Schemas.HeatSchema;
            export type $201 = /* HeatSchema */ Components.Schemas.HeatSchema;
        }
    }
    namespace HeatsApiDeleteHeat {
        namespace Parameters {
            /**
             * Heat Id
             */
            export type HeatId = number;
        }
        export interface PathParameters {
            heat_id: /* Heat Id */ Parameters.HeatId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace HeatsApiGetHeat {
        namespace Parameters {
            /**
             * Heat Id
             */
            export type HeatId = number;
        }
        export interface PathParameters {
            heat_id: /* Heat Id */ Parameters.HeatId;
        }
        namespace Responses {
            export type $200 = /* HeatSchema */ Components.Schemas.HeatSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace HeatsApiGetHeatsForRace {
        namespace Parameters {
            /**
             * Race Id
             */
            export type RaceId = number;
        }
        export interface PathParameters {
            race_id: /* Race Id */ Parameters.RaceId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* HeatSchema */ Components.Schemas.HeatSchema[];
        }
    }
    namespace HeatsApiUpdateHeat {
        namespace Parameters {
            /**
             * Heat Id
             */
            export type HeatId = number;
        }
        export interface PathParameters {
            heat_id: /* Heat Id */ Parameters.HeatId;
        }
        export type RequestBody = /* PatchHeatSchema */ Components.Schemas.PatchHeatSchema;
        namespace Responses {
            export type $200 = /* HeatSchema */ Components.Schemas.HeatSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiChangeParticipantHeat {
        namespace Parameters {
            /**
             * Participant Id
             */
            export type ParticipantId = number;
        }
        export interface PathParameters {
            participant_id: /* Participant Id */ Parameters.ParticipantId;
        }
        export type RequestBody = /* HeatSchema */ Components.Schemas.HeatSchema;
        namespace Responses {
            export type $200 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
            export type $409 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiChangeParticipantRaceType {
        namespace Parameters {
            /**
             * Participant Id
             */
            export type ParticipantId = number;
        }
        export interface PathParameters {
            participant_id: /* Participant Id */ Parameters.ParticipantId;
        }
        export type RequestBody = /* RaceTypeSchema */ Components.Schemas.RaceTypeSchema;
        namespace Responses {
            export type $201 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
            export type $409 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiCreateParticipant {
        namespace Parameters {
            /**
             * User Id
             */
            export type UserId = number;
        }
        export interface PathParameters {
            user_id: /* User Id */ Parameters.UserId;
        }
        export type RequestBody = /* CreateParticipantSchema */ Components.Schemas.CreateParticipantSchema;
        namespace Responses {
            export type $201 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema;
            export type $409 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiCreateParticipantBulk {
        /**
         * Participantschemas
         */
        export type RequestBody = /* CreateParticipantBulkSchema */ Components.Schemas.CreateParticipantBulkSchema[];
        namespace Responses {
            export type $201 = /**
             * BulkCreateResponseSchema
             * Schema for bulk create response, allows server to respond with items created,
             * and errors limiting specific instances from being created.
             */
            Components.Schemas.BulkCreateResponseSchema;
        }
    }
    namespace ParticipantsApiCreateParticipantComment {
        namespace Parameters {
            /**
             * Participant Id
             */
            export type ParticipantId = number;
        }
        export interface PathParameters {
            participant_id: /* Participant Id */ Parameters.ParticipantId;
        }
        export type RequestBody = /* ParticipantCommentCreateSchema */ Components.Schemas.ParticipantCommentCreateSchema;
        namespace Responses {
            export type $201 = /* ParticipantCommentSchema */ Components.Schemas.ParticipantCommentSchema;
            export type $409 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiDeactivateParticipant {
        namespace Parameters {
            /**
             * Participant Id
             */
            export type ParticipantId = number;
        }
        export interface PathParameters {
            participant_id: /* Participant Id */ Parameters.ParticipantId;
        }
        namespace Responses {
            export type $201 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiDeleteParticipantComment {
        namespace Parameters {
            /**
             * Comment Id
             */
            export type CommentId = number;
        }
        export interface PathParameters {
            comment_id: /* Comment Id */ Parameters.CommentId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiGetParticipantComments {
        namespace Parameters {
            /**
             * Participant Id
             */
            export type ParticipantId = number;
        }
        export interface PathParameters {
            participant_id: /* Participant Id */ Parameters.ParticipantId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* ParticipantCommentSchema */ Components.Schemas.ParticipantCommentSchema[];
        }
    }
    namespace ParticipantsApiGetParticipantDetails {
        namespace Parameters {
            /**
             * Participant Id
             */
            export type ParticipantId = number;
        }
        export interface PathParameters {
            participant_id: /* Participant Id */ Parameters.ParticipantId;
        }
        namespace Responses {
            export type $200 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiGetParticipantsForHeat {
        namespace Parameters {
            /**
             * Heat Id
             */
            export type HeatId = number;
        }
        export interface PathParameters {
            heat_id: /* Heat Id */ Parameters.HeatId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema[];
        }
    }
    namespace ParticipantsApiGetParticipantsForRace {
        namespace Parameters {
            /**
             * Bib Number
             */
            export type BibNumber = number;
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
            /**
             * Race Id
             */
            export type RaceId = number;
        }
        export interface PathParameters {
            race_id: /* Race Id */ Parameters.RaceId;
        }
        export interface QueryParameters {
            bib_number?: /* Bib Number */ Parameters.BibNumber;
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedParticipantSchema */ Components.Schemas.PagedParticipantSchema;
        }
    }
    namespace ParticipantsApiGetParticipantsForUser {
        namespace Parameters {
            /**
             * User Id
             */
            export type UserId = number;
        }
        export interface PathParameters {
            user_id: /* User Id */ Parameters.UserId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema[];
        }
    }
    namespace ParticipantsApiParticipantsWithInvalidSwimTime {
        namespace Parameters {
            /**
             * Race Id
             */
            export type RaceId = number;
        }
        export interface PathParameters {
            race_id: /* Race Id */ Parameters.RaceId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema[];
        }
    }
    namespace ParticipantsApiReactivateParticipant {
        namespace Parameters {
            /**
             * Participant Id
             */
            export type ParticipantId = number;
        }
        export interface PathParameters {
            participant_id: /* Participant Id */ Parameters.ParticipantId;
        }
        namespace Responses {
            export type $201 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
            export type $409 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiRecentlyEditedParticipants {
        namespace Parameters {
            /**
             * Count
             */
            export type Count = number;
        }
        export interface QueryParameters {
            count?: /* Count */ Parameters.Count;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema[];
        }
    }
    namespace ParticipantsApiRemoveParticipantHeat {
        namespace Parameters {
            /**
             * Participant Id
             */
            export type ParticipantId = number;
        }
        export interface PathParameters {
            participant_id: /* Participant Id */ Parameters.ParticipantId;
        }
        namespace Responses {
            export type $201 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
            export type $409 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiUpdateParticipant {
        namespace Parameters {
            /**
             * Participant Id
             */
            export type ParticipantId = number;
        }
        export interface PathParameters {
            participant_id: /* Participant Id */ Parameters.ParticipantId;
        }
        export type RequestBody = /* PatchParticipantSchema */ Components.Schemas.PatchParticipantSchema;
        namespace Responses {
            export type $201 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
            export type $409 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace RaceApiCreateRace {
        export type RequestBody = /* CreateRaceSchema */ Components.Schemas.CreateRaceSchema;
        namespace Responses {
            export type $200 = /* RaceSchema */ Components.Schemas.RaceSchema;
            export type $409 = /* RaceSchema */ Components.Schemas.RaceSchema;
        }
    }
    namespace RaceApiCreateRaceType {
        export type RequestBody = /* CreateRaceTypeSchema */ Components.Schemas.CreateRaceTypeSchema;
        namespace Responses {
            export type $200 = /* RaceTypeSchema */ Components.Schemas.RaceTypeSchema;
            export type $201 = /* RaceTypeSchema */ Components.Schemas.RaceTypeSchema;
        }
    }
    namespace RaceApiDeleteRace {
        namespace Parameters {
            /**
             * Race Id
             */
            export type RaceId = number;
            /**
             * Race Type Id
             */
            export type RaceTypeId = number;
        }
        export interface PathParameters {
            race_type_id: /* Race Type Id */ Parameters.RaceTypeId;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace RaceApiGetRace {
        namespace Parameters {
            /**
             * Race Id
             */
            export type RaceId = number;
        }
        export interface PathParameters {
            race_id: /* Race Id */ Parameters.RaceId;
        }
        namespace Responses {
            export type $200 = /* RaceSchema */ Components.Schemas.RaceSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace RaceApiGetRaceStats {
        namespace Parameters {
            /**
             * Race Id
             */
            export type RaceId = number;
        }
        export interface PathParameters {
            race_id: /* Race Id */ Parameters.RaceId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* RaceTypeStatSchema */ Components.Schemas.RaceTypeStatSchema[];
        }
    }
    namespace RaceApiGetRaceTypes {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* RaceTypeSchema */ Components.Schemas.RaceTypeSchema[];
        }
    }
    namespace RaceApiGetRaces {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* RaceSchema */ Components.Schemas.RaceSchema[];
        }
    }
    namespace RaceApiRaceParticipantsDisabled {
        namespace Parameters {
            /**
             * Race Id
             */
            export type RaceId = number;
        }
        export interface PathParameters {
            race_id: /* Race Id */ Parameters.RaceId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema[];
        }
    }
    namespace RaceApiUpdateRaceType {
        namespace Parameters {
            /**
             * Race Type Id
             */
            export type RaceTypeId = number;
        }
        export interface PathParameters {
            race_type_id: /* Race Type Id */ Parameters.RaceTypeId;
        }
        export type RequestBody = /* CreateRaceTypeSchema */ Components.Schemas.CreateRaceTypeSchema;
        namespace Responses {
            export type $201 = /* RaceTypeSchema */ Components.Schemas.RaceTypeSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
}

export interface OperationMethods {
  /**
   * accounts_api_get_active_non_staff_users - Get Active Non Staff Users
   */
  'accounts_api_get_active_non_staff_users'(
    parameters?: Parameters<Paths.AccountsApiGetActiveNonStaffUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiGetActiveNonStaffUsers.Responses.$200>
  /**
   * accounts_api_create_users_bulk - Create Users Bulk
   */
  'accounts_api_create_users_bulk'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AccountsApiCreateUsersBulk.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiCreateUsersBulk.Responses.$201>
  /**
   * accounts_api_admin_action_clean_gender - Admin Action Clean Gender
   */
  'accounts_api_admin_action_clean_gender'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiAdminActionCleanGender.Responses.$200>
  /**
   * accounts_api_get_user_by_id - Get User By Id
   */
  'accounts_api_get_user_by_id'(
    parameters: Parameters<Paths.AccountsApiGetUserById.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiGetUserById.Responses.$200>
  /**
   * accounts_api_update_user - Update User
   */
  'accounts_api_update_user'(
    parameters: Parameters<Paths.AccountsApiUpdateUser.PathParameters>,
    data?: Paths.AccountsApiUpdateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiUpdateUser.Responses.$201>
  /**
   * accounts_api_get_user_by_username - Get User By Username
   */
  'accounts_api_get_user_by_username'(
    parameters: Parameters<Paths.AccountsApiGetUserByUsername.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiGetUserByUsername.Responses.$200>
  /**
   * accounts_api_create_user - Create User
   */
  'accounts_api_create_user'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AccountsApiCreateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiCreateUser.Responses.$200 | Paths.AccountsApiCreateUser.Responses.$201>
  /**
   * participants_api_get_participants_for_user - Get Participants For User
   */
  'participants_api_get_participants_for_user'(
    parameters: Parameters<Paths.ParticipantsApiGetParticipantsForUser.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiGetParticipantsForUser.Responses.$200>
  /**
   * participants_api_create_participant - Create Participant
   */
  'participants_api_create_participant'(
    parameters: Parameters<Paths.ParticipantsApiCreateParticipant.PathParameters>,
    data?: Paths.ParticipantsApiCreateParticipant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiCreateParticipant.Responses.$201>
  /**
   * participants_api_get_participants_for_heat - Get Participants For Heat
   */
  'participants_api_get_participants_for_heat'(
    parameters: Parameters<Paths.ParticipantsApiGetParticipantsForHeat.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiGetParticipantsForHeat.Responses.$200>
  /**
   * participants_api_create_participant_bulk - Create Participant Bulk
   */
  'participants_api_create_participant_bulk'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ParticipantsApiCreateParticipantBulk.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiCreateParticipantBulk.Responses.$201>
  /**
   * participants_api_participants_with_invalid_swim_time - Participants With Invalid Swim Time
   * 
   * Returns all the active participants of the given race that have an invalid swim time.
   */
  'participants_api_participants_with_invalid_swim_time'(
    parameters: Parameters<Paths.ParticipantsApiParticipantsWithInvalidSwimTime.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantsWithInvalidSwimTime.Responses.$200>
  /**
   * participants_api_get_participants_for_race - Get Participants For Race
   */
  'participants_api_get_participants_for_race'(
    parameters: Parameters<Paths.ParticipantsApiGetParticipantsForRace.QueryParameters & Paths.ParticipantsApiGetParticipantsForRace.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiGetParticipantsForRace.Responses.$200>
  /**
   * participants_api_recently_edited_participants - Recently Edited Participants
   * 
   * Returns the most recently edited participants.
   */
  'participants_api_recently_edited_participants'(
    parameters?: Parameters<Paths.ParticipantsApiRecentlyEditedParticipants.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRecentlyEditedParticipants.Responses.$200>
  /**
   * participants_api_delete_participant_comment - Delete Participant Comment
   */
  'participants_api_delete_participant_comment'(
    parameters: Parameters<Paths.ParticipantsApiDeleteParticipantComment.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiDeleteParticipantComment.Responses.$204>
  /**
   * participants_api_reactivate_participant - Reactivate Participant
   */
  'participants_api_reactivate_participant'(
    parameters: Parameters<Paths.ParticipantsApiReactivateParticipant.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiReactivateParticipant.Responses.$201>
  /**
   * participants_api_change_participant_race_type - Change Participant Race Type
   */
  'participants_api_change_participant_race_type'(
    parameters: Parameters<Paths.ParticipantsApiChangeParticipantRaceType.PathParameters>,
    data?: Paths.ParticipantsApiChangeParticipantRaceType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiChangeParticipantRaceType.Responses.$201>
  /**
   * participants_api_change_participant_heat - Change Participant Heat
   */
  'participants_api_change_participant_heat'(
    parameters: Parameters<Paths.ParticipantsApiChangeParticipantHeat.PathParameters>,
    data?: Paths.ParticipantsApiChangeParticipantHeat.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiChangeParticipantHeat.Responses.$200>
  /**
   * participants_api_remove_participant_heat - Remove Participant Heat
   */
  'participants_api_remove_participant_heat'(
    parameters: Parameters<Paths.ParticipantsApiRemoveParticipantHeat.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRemoveParticipantHeat.Responses.$201>
  /**
   * participants_api_deactivate_participant - Deactivate Participant
   */
  'participants_api_deactivate_participant'(
    parameters: Parameters<Paths.ParticipantsApiDeactivateParticipant.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiDeactivateParticipant.Responses.$201>
  /**
   * participants_api_get_participant_comments - Get Participant Comments
   */
  'participants_api_get_participant_comments'(
    parameters: Parameters<Paths.ParticipantsApiGetParticipantComments.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiGetParticipantComments.Responses.$200>
  /**
   * participants_api_create_participant_comment - Create Participant Comment
   */
  'participants_api_create_participant_comment'(
    parameters: Parameters<Paths.ParticipantsApiCreateParticipantComment.PathParameters>,
    data?: Paths.ParticipantsApiCreateParticipantComment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiCreateParticipantComment.Responses.$201>
  /**
   * participants_api_get_participant_details - Get Participant Details
   */
  'participants_api_get_participant_details'(
    parameters: Parameters<Paths.ParticipantsApiGetParticipantDetails.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiGetParticipantDetails.Responses.$200>
  /**
   * participants_api_update_participant - Update Participant
   */
  'participants_api_update_participant'(
    parameters: Parameters<Paths.ParticipantsApiUpdateParticipant.PathParameters>,
    data?: Paths.ParticipantsApiUpdateParticipant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiUpdateParticipant.Responses.$201>
  /**
   * race_api_get_race_types - Get Race Types
   */
  'race_api_get_race_types'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiGetRaceTypes.Responses.$200>
  /**
   * race_api_create_race_type - Create Race Type
   */
  'race_api_create_race_type'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RaceApiCreateRaceType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiCreateRaceType.Responses.$200 | Paths.RaceApiCreateRaceType.Responses.$201>
  /**
   * race_api_update_race_type - Update Race Type
   */
  'race_api_update_race_type'(
    parameters: Parameters<Paths.RaceApiUpdateRaceType.PathParameters>,
    data?: Paths.RaceApiUpdateRaceType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiUpdateRaceType.Responses.$201>
  /**
   * race_api_delete_race - Delete Race
   */
  'race_api_delete_race'(
    parameters: Parameters<Paths.RaceApiDeleteRace.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiDeleteRace.Responses.$204>
  /**
   * race_api_get_races - Get Races
   */
  'race_api_get_races'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiGetRaces.Responses.$200>
  /**
   * race_api_create_race - Create Race
   */
  'race_api_create_race'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RaceApiCreateRace.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiCreateRace.Responses.$200>
  /**
   * race_api_get_race_stats - Get Race Stats
   */
  'race_api_get_race_stats'(
    parameters: Parameters<Paths.RaceApiGetRaceStats.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiGetRaceStats.Responses.$200>
  /**
   * race_api_race_participants_disabled - Race Participants Disabled
   */
  'race_api_race_participants_disabled'(
    parameters: Parameters<Paths.RaceApiRaceParticipantsDisabled.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceParticipantsDisabled.Responses.$200>
  /**
   * race_api_get_race - Get Race
   */
  'race_api_get_race'(
    parameters: Parameters<Paths.RaceApiGetRace.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiGetRace.Responses.$200>
  /**
   * race_api_delete_race - Delete Race
   */
  'race_api_delete_race'(
    parameters: Parameters<Paths.RaceApiDeleteRace.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiDeleteRace.Responses.$204>
  /**
   * heats_api_get_heats_for_race - Get Heats For Race
   */
  'heats_api_get_heats_for_race'(
    parameters: Parameters<Paths.HeatsApiGetHeatsForRace.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.HeatsApiGetHeatsForRace.Responses.$200>
  /**
   * heats_api_get_heat - Get Heat
   */
  'heats_api_get_heat'(
    parameters: Parameters<Paths.HeatsApiGetHeat.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.HeatsApiGetHeat.Responses.$200>
  /**
   * heats_api_update_heat - Update Heat
   */
  'heats_api_update_heat'(
    parameters: Parameters<Paths.HeatsApiUpdateHeat.PathParameters>,
    data?: Paths.HeatsApiUpdateHeat.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.HeatsApiUpdateHeat.Responses.$200>
  /**
   * heats_api_delete_heat - Delete Heat
   */
  'heats_api_delete_heat'(
    parameters: Parameters<Paths.HeatsApiDeleteHeat.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.HeatsApiDeleteHeat.Responses.$204>
  /**
   * heats_api_create_heat - Create Heat
   */
  'heats_api_create_heat'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.HeatsApiCreateHeat.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.HeatsApiCreateHeat.Responses.$200 | Paths.HeatsApiCreateHeat.Responses.$201>
}

export interface PathsDictionary {
  ['/api/users/active/non-staff']: {
    /**
     * accounts_api_get_active_non_staff_users - Get Active Non Staff Users
     */
    'get'(
      parameters?: Parameters<Paths.AccountsApiGetActiveNonStaffUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiGetActiveNonStaffUsers.Responses.$200>
  }
  ['/api/users/import']: {
    /**
     * accounts_api_create_users_bulk - Create Users Bulk
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AccountsApiCreateUsersBulk.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiCreateUsersBulk.Responses.$201>
  }
  ['/api/users/action/clean_gender']: {
    /**
     * accounts_api_admin_action_clean_gender - Admin Action Clean Gender
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiAdminActionCleanGender.Responses.$200>
  }
  ['/api/users/{user_id}']: {
    /**
     * accounts_api_get_user_by_id - Get User By Id
     */
    'get'(
      parameters: Parameters<Paths.AccountsApiGetUserById.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiGetUserById.Responses.$200>
    /**
     * accounts_api_update_user - Update User
     */
    'patch'(
      parameters: Parameters<Paths.AccountsApiUpdateUser.PathParameters>,
      data?: Paths.AccountsApiUpdateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiUpdateUser.Responses.$201>
  }
  ['/api/users/{username}']: {
    /**
     * accounts_api_get_user_by_username - Get User By Username
     */
    'get'(
      parameters: Parameters<Paths.AccountsApiGetUserByUsername.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiGetUserByUsername.Responses.$200>
  }
  ['/api/users/']: {
    /**
     * accounts_api_create_user - Create User
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AccountsApiCreateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiCreateUser.Responses.$200 | Paths.AccountsApiCreateUser.Responses.$201>
  }
  ['/api/participants/user/{user_id}/participants']: {
    /**
     * participants_api_create_participant - Create Participant
     */
    'post'(
      parameters: Parameters<Paths.ParticipantsApiCreateParticipant.PathParameters>,
      data?: Paths.ParticipantsApiCreateParticipant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiCreateParticipant.Responses.$201>
    /**
     * participants_api_get_participants_for_user - Get Participants For User
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiGetParticipantsForUser.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiGetParticipantsForUser.Responses.$200>
  }
  ['/api/participants/heat/{heat_id}']: {
    /**
     * participants_api_get_participants_for_heat - Get Participants For Heat
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiGetParticipantsForHeat.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiGetParticipantsForHeat.Responses.$200>
  }
  ['/api/participants/import']: {
    /**
     * participants_api_create_participant_bulk - Create Participant Bulk
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ParticipantsApiCreateParticipantBulk.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiCreateParticipantBulk.Responses.$201>
  }
  ['/api/participants/race/{race_id}/invalid_swim_time/']: {
    /**
     * participants_api_participants_with_invalid_swim_time - Participants With Invalid Swim Time
     * 
     * Returns all the active participants of the given race that have an invalid swim time.
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiParticipantsWithInvalidSwimTime.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantsWithInvalidSwimTime.Responses.$200>
  }
  ['/api/participants/race/{race_id}']: {
    /**
     * participants_api_get_participants_for_race - Get Participants For Race
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiGetParticipantsForRace.QueryParameters & Paths.ParticipantsApiGetParticipantsForRace.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiGetParticipantsForRace.Responses.$200>
  }
  ['/api/participants/recently_edited']: {
    /**
     * participants_api_recently_edited_participants - Recently Edited Participants
     * 
     * Returns the most recently edited participants.
     */
    'get'(
      parameters?: Parameters<Paths.ParticipantsApiRecentlyEditedParticipants.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRecentlyEditedParticipants.Responses.$200>
  }
  ['/api/participants/comment/{comment_id}']: {
    /**
     * participants_api_delete_participant_comment - Delete Participant Comment
     */
    'delete'(
      parameters: Parameters<Paths.ParticipantsApiDeleteParticipantComment.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiDeleteParticipantComment.Responses.$204>
  }
  ['/api/participants/{participant_id}/reactivate']: {
    /**
     * participants_api_reactivate_participant - Reactivate Participant
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiReactivateParticipant.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiReactivateParticipant.Responses.$201>
  }
  ['/api/participants/{participant_id}/change_race_type']: {
    /**
     * participants_api_change_participant_race_type - Change Participant Race Type
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiChangeParticipantRaceType.PathParameters>,
      data?: Paths.ParticipantsApiChangeParticipantRaceType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiChangeParticipantRaceType.Responses.$201>
  }
  ['/api/participants/{participant_id}/change_heat']: {
    /**
     * participants_api_change_participant_heat - Change Participant Heat
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiChangeParticipantHeat.PathParameters>,
      data?: Paths.ParticipantsApiChangeParticipantHeat.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiChangeParticipantHeat.Responses.$200>
  }
  ['/api/participants/{participant_id}/remove_heat']: {
    /**
     * participants_api_remove_participant_heat - Remove Participant Heat
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiRemoveParticipantHeat.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRemoveParticipantHeat.Responses.$201>
  }
  ['/api/participants/{participant_id}/deactivate']: {
    /**
     * participants_api_deactivate_participant - Deactivate Participant
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiDeactivateParticipant.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiDeactivateParticipant.Responses.$201>
  }
  ['/api/participants/{participant_id}/comments']: {
    /**
     * participants_api_get_participant_comments - Get Participant Comments
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiGetParticipantComments.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiGetParticipantComments.Responses.$200>
    /**
     * participants_api_create_participant_comment - Create Participant Comment
     */
    'post'(
      parameters: Parameters<Paths.ParticipantsApiCreateParticipantComment.PathParameters>,
      data?: Paths.ParticipantsApiCreateParticipantComment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiCreateParticipantComment.Responses.$201>
  }
  ['/api/participants/{participant_id}']: {
    /**
     * participants_api_get_participant_details - Get Participant Details
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiGetParticipantDetails.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiGetParticipantDetails.Responses.$200>
    /**
     * participants_api_update_participant - Update Participant
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiUpdateParticipant.PathParameters>,
      data?: Paths.ParticipantsApiUpdateParticipant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiUpdateParticipant.Responses.$201>
  }
  ['/api/races/racetypes']: {
    /**
     * race_api_get_race_types - Get Race Types
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiGetRaceTypes.Responses.$200>
    /**
     * race_api_create_race_type - Create Race Type
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RaceApiCreateRaceType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiCreateRaceType.Responses.$200 | Paths.RaceApiCreateRaceType.Responses.$201>
  }
  ['/api/races/racetypes/{race_type_id}']: {
    /**
     * race_api_update_race_type - Update Race Type
     */
    'patch'(
      parameters: Parameters<Paths.RaceApiUpdateRaceType.PathParameters>,
      data?: Paths.RaceApiUpdateRaceType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiUpdateRaceType.Responses.$201>
    /**
     * race_api_delete_race - Delete Race
     */
    'delete'(
      parameters: Parameters<Paths.RaceApiDeleteRace.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiDeleteRace.Responses.$204>
  }
  ['/api/races/']: {
    /**
     * race_api_get_races - Get Races
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiGetRaces.Responses.$200>
    /**
     * race_api_create_race - Create Race
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RaceApiCreateRace.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiCreateRace.Responses.$200>
  }
  ['/api/races/{race_id}/stats']: {
    /**
     * race_api_get_race_stats - Get Race Stats
     */
    'get'(
      parameters: Parameters<Paths.RaceApiGetRaceStats.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiGetRaceStats.Responses.$200>
  }
  ['/api/races/{race_id}/participants/disabled']: {
    /**
     * race_api_race_participants_disabled - Race Participants Disabled
     */
    'get'(
      parameters: Parameters<Paths.RaceApiRaceParticipantsDisabled.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceParticipantsDisabled.Responses.$200>
  }
  ['/api/races/{race_id}']: {
    /**
     * race_api_delete_race - Delete Race
     */
    'delete'(
      parameters: Parameters<Paths.RaceApiDeleteRace.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiDeleteRace.Responses.$204>
    /**
     * race_api_get_race - Get Race
     */
    'get'(
      parameters: Parameters<Paths.RaceApiGetRace.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiGetRace.Responses.$200>
  }
  ['/api/heats/race/{race_id}']: {
    /**
     * heats_api_get_heats_for_race - Get Heats For Race
     */
    'get'(
      parameters: Parameters<Paths.HeatsApiGetHeatsForRace.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.HeatsApiGetHeatsForRace.Responses.$200>
  }
  ['/api/heats/{heat_id}']: {
    /**
     * heats_api_get_heat - Get Heat
     */
    'get'(
      parameters: Parameters<Paths.HeatsApiGetHeat.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.HeatsApiGetHeat.Responses.$200>
    /**
     * heats_api_update_heat - Update Heat
     */
    'patch'(
      parameters: Parameters<Paths.HeatsApiUpdateHeat.PathParameters>,
      data?: Paths.HeatsApiUpdateHeat.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.HeatsApiUpdateHeat.Responses.$200>
    /**
     * heats_api_delete_heat - Delete Heat
     */
    'delete'(
      parameters: Parameters<Paths.HeatsApiDeleteHeat.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.HeatsApiDeleteHeat.Responses.$204>
  }
  ['/api/heats/']: {
    /**
     * heats_api_create_heat - Create Heat
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.HeatsApiCreateHeat.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.HeatsApiCreateHeat.Responses.$200 | Paths.HeatsApiCreateHeat.Responses.$201>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
