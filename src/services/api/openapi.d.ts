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
         * CreateRelayParticipantSchema
         */
        export interface CreateRelayParticipantSchema {
            /**
             * Location
             */
            location?: /* Location */ string | null;
            /**
             * User
             */
            user_id: number;
            /**
             * Team
             */
            team_id: number;
        }
        /**
         * CreateRelayTeamSchema
         */
        export interface CreateRelayTeamSchema {
            /**
             * Bib Number
             */
            bib_number: number;
            /**
             * Relay Team Name
             */
            name: string;
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
         * PagedParticipantCommentSchema
         */
        export interface PagedParticipantCommentSchema {
            /**
             * Items
             */
            items: /* ParticipantCommentSchema */ ParticipantCommentSchema[];
            /**
             * Count
             */
            count: number;
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
         * ParticipationSchema
         * A simple Participation schema that allows returning IDs for Participant and RelayParticipant Models.
         */
        export interface ParticipationSchema {
            /**
             * Id
             */
            id: number;
            race: /* RaceSchema */ RaceSchema;
            type: /* ParticipationTypes */ ParticipationTypes;
            user: /* UserSchema */ UserSchema;
            /**
             * Bib Number
             */
            bib_number: number;
        }
        /**
         * ParticipationTypes
         */
        export type ParticipationTypes = "participant" | "relay_participant";
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
         * PatchRelayParticipantSchema
         */
        export interface PatchRelayParticipantSchema {
            origin?: /* LocationSchema */ LocationSchema | null;
            /**
             * Location
             */
            location?: /* Location */ string | null;
        }
        /**
         * PatchRelayTeamSchema
         */
        export interface PatchRelayTeamSchema {
            /**
             * Bib Number
             */
            bib_number?: /* Bib Number */ number | null;
            /**
             * Relay Team Name
             */
            name?: /* Relay Team Name */ string | null;
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
         * RaceTypeBibInfoSchema
         */
        export interface RaceTypeBibInfoSchema {
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
            /**
             * Smallest Bib
             */
            smallest_bib: number;
            /**
             * Largest Bib
             */
            largest_bib: number;
            /**
             * Count
             */
            count: number;
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
         * RelayTeamCommentCreateSchema
         */
        export interface RelayTeamCommentCreateSchema {
            /**
             * Comment
             */
            comment: string;
        }
        /**
         * RelayTeamCommentSchema
         */
        export interface RelayTeamCommentSchema {
            /**
             * Writer Name
             */
            writer_name?: string;
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Relay Team
             */
            relay_team: number;
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
         * RelayTeamParticipantSchema
         */
        export interface RelayTeamParticipantSchema {
            origin?: /* LocationSchema */ LocationSchema | null;
            user: /* UserSchema */ UserSchema;
            team: /* RelayTeamSchema */ RelayTeamSchema;
            /**
             * ID
             */
            id?: /* ID */ number | null;
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
         * RelayTeamSchema
         */
        export interface RelayTeamSchema {
            race: /* RaceSchema */ RaceSchema;
            race_type: /* RaceTypeSchema */ RaceTypeSchema;
            heat?: /* HeatSchema */ HeatSchema | null;
            /**
             * ID
             */
            id?: /* ID */ number | null;
            /**
             * Is Active
             */
            is_active?: boolean;
            /**
             * Bib Number
             */
            bib_number: number;
            /**
             * Relay Team Name
             */
            name: string;
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
    namespace AccountsApiCreateUserParticipant {
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
    namespace AccountsApiGetUserParticipants {
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
    namespace AccountsApiGetUserParticipations {
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
            export type $200 = /**
             * ParticipationSchema
             * A simple Participation schema that allows returning IDs for Participant and RelayParticipant Models.
             */
            Components.Schemas.ParticipationSchema[];
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
    namespace HeatsApiGetHeatParticipants {
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
    namespace ParticipantsApiCommentApiDeleteParticipantComment {
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
    namespace ParticipantsApiCommentApiDeleteRelayTeamComment {
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
    namespace ParticipantsApiCommentApiGetAllParticipantComments {
        namespace Parameters {
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Offset
             */
            export type Offset = number;
        }
        export interface QueryParameters {
            limit?: /* Limit */ Parameters.Limit;
            offset?: /* Offset */ Parameters.Offset;
        }
        namespace Responses {
            export type $200 = /* PagedParticipantCommentSchema */ Components.Schemas.PagedParticipantCommentSchema;
        }
    }
    namespace ParticipantsApiParticipantApiChangeParticipantHeat {
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
    namespace ParticipantsApiParticipantApiChangeParticipantRaceType {
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
    namespace ParticipantsApiParticipantApiCreateParticipantBulk {
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
    namespace ParticipantsApiParticipantApiCreateParticipantComment {
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
    namespace ParticipantsApiParticipantApiDeactivateParticipant {
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
    namespace ParticipantsApiParticipantApiGetParticipant {
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
    namespace ParticipantsApiParticipantApiGetParticipantComments {
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
    namespace ParticipantsApiParticipantApiReactivateParticipant {
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
    namespace ParticipantsApiParticipantApiRecentlyEditedParticipants {
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
    namespace ParticipantsApiParticipantApiRemoveParticipantHeat {
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
    namespace ParticipantsApiParticipantApiUpdateParticipant {
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
    namespace ParticipantsApiRelayTeamApiAddParticipantToRelayTeam {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        export type RequestBody = /* CreateRelayParticipantSchema */ Components.Schemas.CreateRelayParticipantSchema;
        namespace Responses {
            export type $201 = /* RelayTeamParticipantSchema */ Components.Schemas.RelayTeamParticipantSchema;
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
    namespace ParticipantsApiRelayTeamApiChangeRelayTeamHeat {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        export type RequestBody = /* HeatSchema */ Components.Schemas.HeatSchema;
        namespace Responses {
            export type $200 = /* RelayTeamSchema */ Components.Schemas.RelayTeamSchema;
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
    namespace ParticipantsApiRelayTeamApiChangeRelayTeamRaceType {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        export type RequestBody = /* RaceTypeSchema */ Components.Schemas.RaceTypeSchema;
        namespace Responses {
            export type $201 = /* RelayTeamSchema */ Components.Schemas.RelayTeamSchema;
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
    namespace ParticipantsApiRelayTeamApiCreateRelayTeam {
        export type RequestBody = /* CreateRelayTeamSchema */ Components.Schemas.CreateRelayTeamSchema;
        namespace Responses {
            export type $201 = /* RelayTeamSchema */ Components.Schemas.RelayTeamSchema;
            export type $409 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiRelayTeamApiCreateRelayTeamComment {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        export type RequestBody = /* RelayTeamCommentCreateSchema */ Components.Schemas.RelayTeamCommentCreateSchema;
        namespace Responses {
            export type $201 = /* RelayTeamCommentSchema */ Components.Schemas.RelayTeamCommentSchema;
            export type $409 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiRelayTeamApiDeactivateRelayTeam {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        namespace Responses {
            export type $201 = /* RelayTeamSchema */ Components.Schemas.RelayTeamSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiRelayTeamApiGetRelayParticipant {
        namespace Parameters {
            /**
             * Relay Participant Id
             */
            export type RelayParticipantId = number;
        }
        export interface PathParameters {
            relay_participant_id: /* Relay Participant Id */ Parameters.RelayParticipantId;
        }
        namespace Responses {
            export type $200 = /* RelayTeamParticipantSchema */ Components.Schemas.RelayTeamParticipantSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiRelayTeamApiGetRelayTeamByName {
        namespace Parameters {
            /**
             * Relay Team Name
             */
            export type RelayTeamName = string;
        }
        export interface PathParameters {
            relay_team_name: /* Relay Team Name */ Parameters.RelayTeamName;
        }
        namespace Responses {
            export type $200 = /* RelayTeamSchema */ Components.Schemas.RelayTeamSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiRelayTeamApiGetRelayTeamComments {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* RelayTeamCommentSchema */ Components.Schemas.RelayTeamCommentSchema[];
        }
    }
    namespace ParticipantsApiRelayTeamApiGetRelayTeamParticipants {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* RelayTeamParticipantSchema */ Components.Schemas.RelayTeamParticipantSchema[];
        }
    }
    namespace ParticipantsApiRelayTeamApiReactivateRelayTeam {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        namespace Responses {
            export type $201 = /* RelayTeamSchema */ Components.Schemas.RelayTeamSchema;
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace ParticipantsApiRelayTeamApiRemoveRelayTeamHeat {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        namespace Responses {
            export type $201 = /* RelayTeamSchema */ Components.Schemas.RelayTeamSchema;
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
    namespace ParticipantsApiRelayTeamApiUpdateRelayParticipant {
        namespace Parameters {
            /**
             * Relay Participant Id
             */
            export type RelayParticipantId = number;
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
            relay_participant_id: /* Relay Participant Id */ Parameters.RelayParticipantId;
        }
        export type RequestBody = /* PatchRelayParticipantSchema */ Components.Schemas.PatchRelayParticipantSchema;
        namespace Responses {
            export type $201 = /* RelayTeamParticipantSchema */ Components.Schemas.RelayTeamParticipantSchema;
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
    namespace ParticipantsApiRelayTeamApiUpdateRelayTeam {
        namespace Parameters {
            /**
             * Relay Team Id
             */
            export type RelayTeamId = number;
        }
        export interface PathParameters {
            relay_team_id: /* Relay Team Id */ Parameters.RelayTeamId;
        }
        export type RequestBody = /* PatchRelayTeamSchema */ Components.Schemas.PatchRelayTeamSchema;
        namespace Responses {
            export type $200 = /* RelayTeamSchema */ Components.Schemas.RelayTeamSchema;
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
    namespace RaceApiRaceApiCreateRace {
        export type RequestBody = /* CreateRaceSchema */ Components.Schemas.CreateRaceSchema;
        namespace Responses {
            export type $200 = /* RaceSchema */ Components.Schemas.RaceSchema;
            export type $409 = /* RaceSchema */ Components.Schemas.RaceSchema;
        }
    }
    namespace RaceApiRaceApiDeleteRace {
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
            export interface $204 {
            }
            export type $404 = /**
             * ErrorObjectSchema
             * Schema for the error object as described in decisions_api.md
             */
            Components.Schemas.ErrorObjectSchema;
        }
    }
    namespace RaceApiRaceApiGetRace {
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
    namespace RaceApiRaceApiGetRaceBibInfoPerRaceType {
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
            export type $200 = /* RaceTypeBibInfoSchema */ Components.Schemas.RaceTypeBibInfoSchema[];
        }
    }
    namespace RaceApiRaceApiGetRaceHeats {
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
    namespace RaceApiRaceApiGetRaceParticipants {
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
    namespace RaceApiRaceApiGetRaceParticipantsDisabled {
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
    namespace RaceApiRaceApiGetRaceParticipantsWithInvalidSwimTime {
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
    namespace RaceApiRaceApiGetRaceParticipations {
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
            /**
             * Response
             */
            export type $200 = /**
             * ParticipationSchema
             * A simple Participation schema that allows returning IDs for Participant and RelayParticipant Models.
             */
            Components.Schemas.ParticipationSchema[];
        }
    }
    namespace RaceApiRaceApiGetRaceStats {
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
    namespace RaceApiRaceApiGetRaces {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* RaceSchema */ Components.Schemas.RaceSchema[];
        }
    }
    namespace RaceApiRaceTypeApiCreateRaceType {
        export type RequestBody = /* CreateRaceTypeSchema */ Components.Schemas.CreateRaceTypeSchema;
        namespace Responses {
            export type $200 = /* RaceTypeSchema */ Components.Schemas.RaceTypeSchema;
            export type $201 = /* RaceTypeSchema */ Components.Schemas.RaceTypeSchema;
        }
    }
    namespace RaceApiRaceTypeApiDeleteRace {
        namespace Parameters {
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
    namespace RaceApiRaceTypeApiGetRaceTypes {
        namespace Responses {
            /**
             * Response
             */
            export type $200 = /* RaceTypeSchema */ Components.Schemas.RaceTypeSchema[];
        }
    }
    namespace RaceApiRaceTypeApiUpdateRaceType {
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
   * accounts_api_get_user_participations - Get User Participations
   */
  'accounts_api_get_user_participations'(
    parameters: Parameters<Paths.AccountsApiGetUserParticipations.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiGetUserParticipations.Responses.$200>
  /**
   * accounts_api_get_user_participants - Get User Participants
   */
  'accounts_api_get_user_participants'(
    parameters: Parameters<Paths.AccountsApiGetUserParticipants.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiGetUserParticipants.Responses.$200>
  /**
   * accounts_api_create_user_participant - Create User Participant
   */
  'accounts_api_create_user_participant'(
    parameters: Parameters<Paths.AccountsApiCreateUserParticipant.PathParameters>,
    data?: Paths.AccountsApiCreateUserParticipant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiCreateUserParticipant.Responses.$201>
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
   * race_api_race_api_get_races - Get Races
   */
  'race_api_race_api_get_races'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiGetRaces.Responses.$200>
  /**
   * race_api_race_api_create_race - Create Race
   */
  'race_api_race_api_create_race'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RaceApiRaceApiCreateRace.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiCreateRace.Responses.$200>
  /**
   * race_api_race_api_get_race_heats - Get Race Heats
   */
  'race_api_race_api_get_race_heats'(
    parameters: Parameters<Paths.RaceApiRaceApiGetRaceHeats.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiGetRaceHeats.Responses.$200>
  /**
   * race_api_race_api_get_race_participants_with_invalid_swim_time - Get Race Participants With Invalid Swim Time
   * 
   * Returns all the active participants of the given race that have an invalid swim time.
   */
  'race_api_race_api_get_race_participants_with_invalid_swim_time'(
    parameters: Parameters<Paths.RaceApiRaceApiGetRaceParticipantsWithInvalidSwimTime.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiGetRaceParticipantsWithInvalidSwimTime.Responses.$200>
  /**
   * race_api_race_api_get_race_participants - Get Race Participants
   */
  'race_api_race_api_get_race_participants'(
    parameters: Parameters<Paths.RaceApiRaceApiGetRaceParticipants.QueryParameters & Paths.RaceApiRaceApiGetRaceParticipants.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiGetRaceParticipants.Responses.$200>
  /**
   * race_api_race_api_get_race_participations - Get Race Participations
   * 
   * Returns all the normal and Relay Participants for this race.
   */
  'race_api_race_api_get_race_participations'(
    parameters: Parameters<Paths.RaceApiRaceApiGetRaceParticipations.QueryParameters & Paths.RaceApiRaceApiGetRaceParticipations.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiGetRaceParticipations.Responses.$200>
  /**
   * race_api_race_api_get_race_stats - Get Race Stats
   */
  'race_api_race_api_get_race_stats'(
    parameters: Parameters<Paths.RaceApiRaceApiGetRaceStats.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiGetRaceStats.Responses.$200>
  /**
   * race_api_race_api_get_race_participants_disabled - Get Race Participants Disabled
   */
  'race_api_race_api_get_race_participants_disabled'(
    parameters: Parameters<Paths.RaceApiRaceApiGetRaceParticipantsDisabled.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiGetRaceParticipantsDisabled.Responses.$200>
  /**
   * race_api_race_api_get_race_bib_info_per_race_type - Get Race Bib Info Per Race Type
   */
  'race_api_race_api_get_race_bib_info_per_race_type'(
    parameters: Parameters<Paths.RaceApiRaceApiGetRaceBibInfoPerRaceType.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiGetRaceBibInfoPerRaceType.Responses.$200>
  /**
   * race_api_race_api_get_race - Get Race
   */
  'race_api_race_api_get_race'(
    parameters: Parameters<Paths.RaceApiRaceApiGetRace.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiGetRace.Responses.$200>
  /**
   * race_api_race_api_delete_race - Delete Race
   */
  'race_api_race_api_delete_race'(
    parameters: Parameters<Paths.RaceApiRaceApiDeleteRace.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceApiDeleteRace.Responses.$204>
  /**
   * race_api_race_type_api_update_race_type - Update Race Type
   */
  'race_api_race_type_api_update_race_type'(
    parameters: Parameters<Paths.RaceApiRaceTypeApiUpdateRaceType.PathParameters>,
    data?: Paths.RaceApiRaceTypeApiUpdateRaceType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceTypeApiUpdateRaceType.Responses.$201>
  /**
   * race_api_race_type_api_delete_race - Delete Race
   */
  'race_api_race_type_api_delete_race'(
    parameters: Parameters<Paths.RaceApiRaceTypeApiDeleteRace.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceTypeApiDeleteRace.Responses.$204>
  /**
   * race_api_race_type_api_get_race_types - Get Race Types
   */
  'race_api_race_type_api_get_race_types'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceTypeApiGetRaceTypes.Responses.$200>
  /**
   * race_api_race_type_api_create_race_type - Create Race Type
   */
  'race_api_race_type_api_create_race_type'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RaceApiRaceTypeApiCreateRaceType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RaceApiRaceTypeApiCreateRaceType.Responses.$200 | Paths.RaceApiRaceTypeApiCreateRaceType.Responses.$201>
  /**
   * heats_api_get_heat_participants - Get Heat Participants
   */
  'heats_api_get_heat_participants'(
    parameters: Parameters<Paths.HeatsApiGetHeatParticipants.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.HeatsApiGetHeatParticipants.Responses.$200>
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
  /**
   * participants_api_participant_api_create_participant_bulk - Create Participant Bulk
   */
  'participants_api_participant_api_create_participant_bulk'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ParticipantsApiParticipantApiCreateParticipantBulk.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiCreateParticipantBulk.Responses.$201>
  /**
   * participants_api_participant_api_recently_edited_participants - Recently Edited Participants
   * 
   * Returns the most recently edited participants.
   */
  'participants_api_participant_api_recently_edited_participants'(
    parameters?: Parameters<Paths.ParticipantsApiParticipantApiRecentlyEditedParticipants.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiRecentlyEditedParticipants.Responses.$200>
  /**
   * participants_api_participant_api_reactivate_participant - Reactivate Participant
   */
  'participants_api_participant_api_reactivate_participant'(
    parameters: Parameters<Paths.ParticipantsApiParticipantApiReactivateParticipant.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiReactivateParticipant.Responses.$201>
  /**
   * participants_api_participant_api_change_participant_race_type - Change Participant Race Type
   */
  'participants_api_participant_api_change_participant_race_type'(
    parameters: Parameters<Paths.ParticipantsApiParticipantApiChangeParticipantRaceType.PathParameters>,
    data?: Paths.ParticipantsApiParticipantApiChangeParticipantRaceType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiChangeParticipantRaceType.Responses.$201>
  /**
   * participants_api_participant_api_change_participant_heat - Change Participant Heat
   */
  'participants_api_participant_api_change_participant_heat'(
    parameters: Parameters<Paths.ParticipantsApiParticipantApiChangeParticipantHeat.PathParameters>,
    data?: Paths.ParticipantsApiParticipantApiChangeParticipantHeat.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiChangeParticipantHeat.Responses.$200>
  /**
   * participants_api_participant_api_remove_participant_heat - Remove Participant Heat
   */
  'participants_api_participant_api_remove_participant_heat'(
    parameters: Parameters<Paths.ParticipantsApiParticipantApiRemoveParticipantHeat.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiRemoveParticipantHeat.Responses.$201>
  /**
   * participants_api_participant_api_deactivate_participant - Deactivate Participant
   */
  'participants_api_participant_api_deactivate_participant'(
    parameters: Parameters<Paths.ParticipantsApiParticipantApiDeactivateParticipant.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiDeactivateParticipant.Responses.$201>
  /**
   * participants_api_participant_api_get_participant_comments - Get Participant Comments
   */
  'participants_api_participant_api_get_participant_comments'(
    parameters: Parameters<Paths.ParticipantsApiParticipantApiGetParticipantComments.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiGetParticipantComments.Responses.$200>
  /**
   * participants_api_participant_api_create_participant_comment - Create Participant Comment
   */
  'participants_api_participant_api_create_participant_comment'(
    parameters: Parameters<Paths.ParticipantsApiParticipantApiCreateParticipantComment.PathParameters>,
    data?: Paths.ParticipantsApiParticipantApiCreateParticipantComment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiCreateParticipantComment.Responses.$201>
  /**
   * participants_api_participant_api_get_participant - Get Participant
   */
  'participants_api_participant_api_get_participant'(
    parameters: Parameters<Paths.ParticipantsApiParticipantApiGetParticipant.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiGetParticipant.Responses.$200>
  /**
   * participants_api_participant_api_update_participant - Update Participant
   */
  'participants_api_participant_api_update_participant'(
    parameters: Parameters<Paths.ParticipantsApiParticipantApiUpdateParticipant.PathParameters>,
    data?: Paths.ParticipantsApiParticipantApiUpdateParticipant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiParticipantApiUpdateParticipant.Responses.$201>
  /**
   * participants_api_comment_api_get_all_participant_comments - Get All Participant Comments
   */
  'participants_api_comment_api_get_all_participant_comments'(
    parameters?: Parameters<Paths.ParticipantsApiCommentApiGetAllParticipantComments.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiCommentApiGetAllParticipantComments.Responses.$200>
  /**
   * participants_api_comment_api_delete_participant_comment - Delete Participant Comment
   */
  'participants_api_comment_api_delete_participant_comment'(
    parameters: Parameters<Paths.ParticipantsApiCommentApiDeleteParticipantComment.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiCommentApiDeleteParticipantComment.Responses.$204>
  /**
   * participants_api_relay_team_api_get_relay_team_comments - Get Relay Team Comments
   */
  'participants_api_relay_team_api_get_relay_team_comments'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiGetRelayTeamComments.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiGetRelayTeamComments.Responses.$200>
  /**
   * participants_api_relay_team_api_create_relay_team_comment - Create Relay Team Comment
   */
  'participants_api_relay_team_api_create_relay_team_comment'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiCreateRelayTeamComment.PathParameters>,
    data?: Paths.ParticipantsApiRelayTeamApiCreateRelayTeamComment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiCreateRelayTeamComment.Responses.$201>
  /**
   * participants_api_relay_team_api_change_relay_team_race_type - Change Relay Team Race Type
   */
  'participants_api_relay_team_api_change_relay_team_race_type'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiChangeRelayTeamRaceType.PathParameters>,
    data?: Paths.ParticipantsApiRelayTeamApiChangeRelayTeamRaceType.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiChangeRelayTeamRaceType.Responses.$201>
  /**
   * participants_api_relay_team_api_change_relay_team_heat - Change Relay Team Heat
   */
  'participants_api_relay_team_api_change_relay_team_heat'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiChangeRelayTeamHeat.PathParameters>,
    data?: Paths.ParticipantsApiRelayTeamApiChangeRelayTeamHeat.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiChangeRelayTeamHeat.Responses.$200>
  /**
   * participants_api_relay_team_api_remove_relay_team_heat - Remove Relay Team Heat
   */
  'participants_api_relay_team_api_remove_relay_team_heat'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiRemoveRelayTeamHeat.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiRemoveRelayTeamHeat.Responses.$201>
  /**
   * participants_api_relay_team_api_deactivate_relay_team - Deactivate Relay Team
   */
  'participants_api_relay_team_api_deactivate_relay_team'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiDeactivateRelayTeam.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiDeactivateRelayTeam.Responses.$201>
  /**
   * participants_api_relay_team_api_reactivate_relay_team - Reactivate Relay Team
   */
  'participants_api_relay_team_api_reactivate_relay_team'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiReactivateRelayTeam.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiReactivateRelayTeam.Responses.$201>
  /**
   * participants_api_relay_team_api_get_relay_team_participants - Get Relay Team Participants
   */
  'participants_api_relay_team_api_get_relay_team_participants'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiGetRelayTeamParticipants.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiGetRelayTeamParticipants.Responses.$200>
  /**
   * participants_api_relay_team_api_add_participant_to_relay_team - Add Participant To Relay Team
   */
  'participants_api_relay_team_api_add_participant_to_relay_team'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiAddParticipantToRelayTeam.PathParameters>,
    data?: Paths.ParticipantsApiRelayTeamApiAddParticipantToRelayTeam.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiAddParticipantToRelayTeam.Responses.$201>
  /**
   * participants_api_relay_team_api_update_relay_participant - Update Relay Participant
   */
  'participants_api_relay_team_api_update_relay_participant'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiUpdateRelayParticipant.PathParameters>,
    data?: Paths.ParticipantsApiRelayTeamApiUpdateRelayParticipant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiUpdateRelayParticipant.Responses.$201>
  /**
   * participants_api_relay_team_api_get_relay_participant - Get Relay Participant
   */
  'participants_api_relay_team_api_get_relay_participant'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiGetRelayParticipant.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiGetRelayParticipant.Responses.$200>
  /**
   * participants_api_relay_team_api_update_relay_team - Update Relay Team
   */
  'participants_api_relay_team_api_update_relay_team'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiUpdateRelayTeam.PathParameters>,
    data?: Paths.ParticipantsApiRelayTeamApiUpdateRelayTeam.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiUpdateRelayTeam.Responses.$200>
  /**
   * participants_api_relay_team_api_get_relay_team_by_name - Get Relay Team By Name
   */
  'participants_api_relay_team_api_get_relay_team_by_name'(
    parameters: Parameters<Paths.ParticipantsApiRelayTeamApiGetRelayTeamByName.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiGetRelayTeamByName.Responses.$200>
  /**
   * participants_api_relay_team_api_create_relay_team - Create Relay Team
   */
  'participants_api_relay_team_api_create_relay_team'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ParticipantsApiRelayTeamApiCreateRelayTeam.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiRelayTeamApiCreateRelayTeam.Responses.$201>
  /**
   * participants_api_comment_api_delete_relay_team_comment - Delete Relay Team Comment
   */
  'participants_api_comment_api_delete_relay_team_comment'(
    parameters: Parameters<Paths.ParticipantsApiCommentApiDeleteRelayTeamComment.PathParameters>,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiCommentApiDeleteRelayTeamComment.Responses.$204>
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
  ['/api/users/{user_id}/participations']: {
    /**
     * accounts_api_get_user_participations - Get User Participations
     */
    'get'(
      parameters: Parameters<Paths.AccountsApiGetUserParticipations.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiGetUserParticipations.Responses.$200>
  }
  ['/api/users/{user_id}/participants']: {
    /**
     * accounts_api_create_user_participant - Create User Participant
     */
    'post'(
      parameters: Parameters<Paths.AccountsApiCreateUserParticipant.PathParameters>,
      data?: Paths.AccountsApiCreateUserParticipant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiCreateUserParticipant.Responses.$201>
    /**
     * accounts_api_get_user_participants - Get User Participants
     */
    'get'(
      parameters: Parameters<Paths.AccountsApiGetUserParticipants.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiGetUserParticipants.Responses.$200>
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
  ['/api/races/']: {
    /**
     * race_api_race_api_get_races - Get Races
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiGetRaces.Responses.$200>
    /**
     * race_api_race_api_create_race - Create Race
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RaceApiRaceApiCreateRace.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiCreateRace.Responses.$200>
  }
  ['/api/races/{race_id}/heats']: {
    /**
     * race_api_race_api_get_race_heats - Get Race Heats
     */
    'get'(
      parameters: Parameters<Paths.RaceApiRaceApiGetRaceHeats.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiGetRaceHeats.Responses.$200>
  }
  ['/api/races/{race_id}/participants/invalid_swim_time/']: {
    /**
     * race_api_race_api_get_race_participants_with_invalid_swim_time - Get Race Participants With Invalid Swim Time
     * 
     * Returns all the active participants of the given race that have an invalid swim time.
     */
    'get'(
      parameters: Parameters<Paths.RaceApiRaceApiGetRaceParticipantsWithInvalidSwimTime.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiGetRaceParticipantsWithInvalidSwimTime.Responses.$200>
  }
  ['/api/races/{race_id}/participants']: {
    /**
     * race_api_race_api_get_race_participants - Get Race Participants
     */
    'get'(
      parameters: Parameters<Paths.RaceApiRaceApiGetRaceParticipants.QueryParameters & Paths.RaceApiRaceApiGetRaceParticipants.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiGetRaceParticipants.Responses.$200>
  }
  ['/api/races/{race_id}/participations']: {
    /**
     * race_api_race_api_get_race_participations - Get Race Participations
     * 
     * Returns all the normal and Relay Participants for this race.
     */
    'get'(
      parameters: Parameters<Paths.RaceApiRaceApiGetRaceParticipations.QueryParameters & Paths.RaceApiRaceApiGetRaceParticipations.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiGetRaceParticipations.Responses.$200>
  }
  ['/api/races/{race_id}/stats']: {
    /**
     * race_api_race_api_get_race_stats - Get Race Stats
     */
    'get'(
      parameters: Parameters<Paths.RaceApiRaceApiGetRaceStats.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiGetRaceStats.Responses.$200>
  }
  ['/api/races/{race_id}/participants/disabled']: {
    /**
     * race_api_race_api_get_race_participants_disabled - Get Race Participants Disabled
     */
    'get'(
      parameters: Parameters<Paths.RaceApiRaceApiGetRaceParticipantsDisabled.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiGetRaceParticipantsDisabled.Responses.$200>
  }
  ['/api/races/{race_id}/racetypes/bib_info']: {
    /**
     * race_api_race_api_get_race_bib_info_per_race_type - Get Race Bib Info Per Race Type
     */
    'get'(
      parameters: Parameters<Paths.RaceApiRaceApiGetRaceBibInfoPerRaceType.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiGetRaceBibInfoPerRaceType.Responses.$200>
  }
  ['/api/races/{race_id}']: {
    /**
     * race_api_race_api_delete_race - Delete Race
     */
    'delete'(
      parameters: Parameters<Paths.RaceApiRaceApiDeleteRace.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiDeleteRace.Responses.$204>
    /**
     * race_api_race_api_get_race - Get Race
     */
    'get'(
      parameters: Parameters<Paths.RaceApiRaceApiGetRace.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceApiGetRace.Responses.$200>
  }
  ['/api/race_types/{race_type_id}']: {
    /**
     * race_api_race_type_api_delete_race - Delete Race
     */
    'delete'(
      parameters: Parameters<Paths.RaceApiRaceTypeApiDeleteRace.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceTypeApiDeleteRace.Responses.$204>
    /**
     * race_api_race_type_api_update_race_type - Update Race Type
     */
    'patch'(
      parameters: Parameters<Paths.RaceApiRaceTypeApiUpdateRaceType.PathParameters>,
      data?: Paths.RaceApiRaceTypeApiUpdateRaceType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceTypeApiUpdateRaceType.Responses.$201>
  }
  ['/api/race_types/']: {
    /**
     * race_api_race_type_api_get_race_types - Get Race Types
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceTypeApiGetRaceTypes.Responses.$200>
    /**
     * race_api_race_type_api_create_race_type - Create Race Type
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RaceApiRaceTypeApiCreateRaceType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RaceApiRaceTypeApiCreateRaceType.Responses.$200 | Paths.RaceApiRaceTypeApiCreateRaceType.Responses.$201>
  }
  ['/api/heats/{heat_id}/participants']: {
    /**
     * heats_api_get_heat_participants - Get Heat Participants
     */
    'get'(
      parameters: Parameters<Paths.HeatsApiGetHeatParticipants.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.HeatsApiGetHeatParticipants.Responses.$200>
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
  ['/api/participants/import']: {
    /**
     * participants_api_participant_api_create_participant_bulk - Create Participant Bulk
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ParticipantsApiParticipantApiCreateParticipantBulk.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiCreateParticipantBulk.Responses.$201>
  }
  ['/api/participants/recently_edited']: {
    /**
     * participants_api_participant_api_recently_edited_participants - Recently Edited Participants
     * 
     * Returns the most recently edited participants.
     */
    'get'(
      parameters?: Parameters<Paths.ParticipantsApiParticipantApiRecentlyEditedParticipants.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiRecentlyEditedParticipants.Responses.$200>
  }
  ['/api/participants/{participant_id}/reactivate']: {
    /**
     * participants_api_participant_api_reactivate_participant - Reactivate Participant
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiParticipantApiReactivateParticipant.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiReactivateParticipant.Responses.$201>
  }
  ['/api/participants/{participant_id}/change_race_type']: {
    /**
     * participants_api_participant_api_change_participant_race_type - Change Participant Race Type
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiParticipantApiChangeParticipantRaceType.PathParameters>,
      data?: Paths.ParticipantsApiParticipantApiChangeParticipantRaceType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiChangeParticipantRaceType.Responses.$201>
  }
  ['/api/participants/{participant_id}/change_heat']: {
    /**
     * participants_api_participant_api_change_participant_heat - Change Participant Heat
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiParticipantApiChangeParticipantHeat.PathParameters>,
      data?: Paths.ParticipantsApiParticipantApiChangeParticipantHeat.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiChangeParticipantHeat.Responses.$200>
  }
  ['/api/participants/{participant_id}/remove_heat']: {
    /**
     * participants_api_participant_api_remove_participant_heat - Remove Participant Heat
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiParticipantApiRemoveParticipantHeat.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiRemoveParticipantHeat.Responses.$201>
  }
  ['/api/participants/{participant_id}/deactivate']: {
    /**
     * participants_api_participant_api_deactivate_participant - Deactivate Participant
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiParticipantApiDeactivateParticipant.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiDeactivateParticipant.Responses.$201>
  }
  ['/api/participants/{participant_id}/comments']: {
    /**
     * participants_api_participant_api_get_participant_comments - Get Participant Comments
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiParticipantApiGetParticipantComments.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiGetParticipantComments.Responses.$200>
    /**
     * participants_api_participant_api_create_participant_comment - Create Participant Comment
     */
    'post'(
      parameters: Parameters<Paths.ParticipantsApiParticipantApiCreateParticipantComment.PathParameters>,
      data?: Paths.ParticipantsApiParticipantApiCreateParticipantComment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiCreateParticipantComment.Responses.$201>
  }
  ['/api/participants/{participant_id}']: {
    /**
     * participants_api_participant_api_get_participant - Get Participant
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiParticipantApiGetParticipant.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiGetParticipant.Responses.$200>
    /**
     * participants_api_participant_api_update_participant - Update Participant
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiParticipantApiUpdateParticipant.PathParameters>,
      data?: Paths.ParticipantsApiParticipantApiUpdateParticipant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiParticipantApiUpdateParticipant.Responses.$201>
  }
  ['/api/participants/comments/']: {
    /**
     * participants_api_comment_api_get_all_participant_comments - Get All Participant Comments
     */
    'get'(
      parameters?: Parameters<Paths.ParticipantsApiCommentApiGetAllParticipantComments.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiCommentApiGetAllParticipantComments.Responses.$200>
  }
  ['/api/participants/comments/{comment_id}']: {
    /**
     * participants_api_comment_api_delete_participant_comment - Delete Participant Comment
     */
    'delete'(
      parameters: Parameters<Paths.ParticipantsApiCommentApiDeleteParticipantComment.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiCommentApiDeleteParticipantComment.Responses.$204>
  }
  ['/api/relay_teams/{relay_team_id}/comments']: {
    /**
     * participants_api_relay_team_api_create_relay_team_comment - Create Relay Team Comment
     */
    'post'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiCreateRelayTeamComment.PathParameters>,
      data?: Paths.ParticipantsApiRelayTeamApiCreateRelayTeamComment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiCreateRelayTeamComment.Responses.$201>
    /**
     * participants_api_relay_team_api_get_relay_team_comments - Get Relay Team Comments
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiGetRelayTeamComments.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiGetRelayTeamComments.Responses.$200>
  }
  ['/api/relay_teams/{relay_team_id}/change_race_type']: {
    /**
     * participants_api_relay_team_api_change_relay_team_race_type - Change Relay Team Race Type
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiChangeRelayTeamRaceType.PathParameters>,
      data?: Paths.ParticipantsApiRelayTeamApiChangeRelayTeamRaceType.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiChangeRelayTeamRaceType.Responses.$201>
  }
  ['/api/relay_teams/{relay_team_id}/change_heat']: {
    /**
     * participants_api_relay_team_api_change_relay_team_heat - Change Relay Team Heat
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiChangeRelayTeamHeat.PathParameters>,
      data?: Paths.ParticipantsApiRelayTeamApiChangeRelayTeamHeat.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiChangeRelayTeamHeat.Responses.$200>
  }
  ['/api/relay_teams/{relay_team_id}/remove_heat']: {
    /**
     * participants_api_relay_team_api_remove_relay_team_heat - Remove Relay Team Heat
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiRemoveRelayTeamHeat.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiRemoveRelayTeamHeat.Responses.$201>
  }
  ['/api/relay_teams/{relay_team_id}/deactivate']: {
    /**
     * participants_api_relay_team_api_deactivate_relay_team - Deactivate Relay Team
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiDeactivateRelayTeam.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiDeactivateRelayTeam.Responses.$201>
  }
  ['/api/relay_teams/{relay_team_id}/reactivate']: {
    /**
     * participants_api_relay_team_api_reactivate_relay_team - Reactivate Relay Team
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiReactivateRelayTeam.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiReactivateRelayTeam.Responses.$201>
  }
  ['/api/relay_teams/{relay_team_id}/participants']: {
    /**
     * participants_api_relay_team_api_add_participant_to_relay_team - Add Participant To Relay Team
     */
    'post'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiAddParticipantToRelayTeam.PathParameters>,
      data?: Paths.ParticipantsApiRelayTeamApiAddParticipantToRelayTeam.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiAddParticipantToRelayTeam.Responses.$201>
    /**
     * participants_api_relay_team_api_get_relay_team_participants - Get Relay Team Participants
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiGetRelayTeamParticipants.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiGetRelayTeamParticipants.Responses.$200>
  }
  ['/api/relay_teams/{relay_team_id}/participants/{relay_participant_id}']: {
    /**
     * participants_api_relay_team_api_update_relay_participant - Update Relay Participant
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiUpdateRelayParticipant.PathParameters>,
      data?: Paths.ParticipantsApiRelayTeamApiUpdateRelayParticipant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiUpdateRelayParticipant.Responses.$201>
  }
  ['/api/relay_teams/participants/{relay_participant_id}']: {
    /**
     * participants_api_relay_team_api_get_relay_participant - Get Relay Participant
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiGetRelayParticipant.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiGetRelayParticipant.Responses.$200>
  }
  ['/api/relay_teams/{relay_team_id}']: {
    /**
     * participants_api_relay_team_api_update_relay_team - Update Relay Team
     */
    'patch'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiUpdateRelayTeam.PathParameters>,
      data?: Paths.ParticipantsApiRelayTeamApiUpdateRelayTeam.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiUpdateRelayTeam.Responses.$200>
  }
  ['/api/relay_teams/{relay_team_name}']: {
    /**
     * participants_api_relay_team_api_get_relay_team_by_name - Get Relay Team By Name
     */
    'get'(
      parameters: Parameters<Paths.ParticipantsApiRelayTeamApiGetRelayTeamByName.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiGetRelayTeamByName.Responses.$200>
  }
  ['/api/relay_teams/']: {
    /**
     * participants_api_relay_team_api_create_relay_team - Create Relay Team
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ParticipantsApiRelayTeamApiCreateRelayTeam.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiRelayTeamApiCreateRelayTeam.Responses.$201>
  }
  ['/api/relay_teams/comments/{comment_id}']: {
    /**
     * participants_api_comment_api_delete_relay_team_comment - Delete Relay Team Comment
     */
    'delete'(
      parameters: Parameters<Paths.ParticipantsApiCommentApiDeleteRelayTeamComment.PathParameters>,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiCommentApiDeleteRelayTeamComment.Responses.$204>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
