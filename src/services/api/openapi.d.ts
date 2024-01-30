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
         * HeatSchema
         */
        export interface HeatSchema {
            race_type: /* RaceTypeSchema */ RaceTypeSchema;
            race: /* RaceSchema */ RaceSchema;
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
            origin: /* LocationSchema */ LocationSchema;
            race: /* RaceSchema */ RaceSchema;
            race_type: /* RaceTypeSchema */ RaceTypeSchema;
            heat: /* HeatSchema */ HeatSchema;
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
            team: string;
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
        }
        /**
         * PatchParticipantSchema
         */
        export interface PatchParticipantSchema {
            origin: /* LocationSchema */ LocationSchema;
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
    namespace AccountsApiGetActiveNonStaffUsers {
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
            export type $201 = /* PagedUserSchema */ Components.Schemas.PagedUserSchema;
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
            export type $201 = /* UserSchema */ Components.Schemas.UserSchema;
            export interface $204 {
            }
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
            export type $201 = /* UserSchema */ Components.Schemas.UserSchema;
            export interface $204 {
            }
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
            /**
             * Response
             */
            export type $201 = boolean;
            /**
             * Response
             */
            export type $500 = string;
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
            export interface $204 {
            }
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
            export type $201 = /* ParticipantSchema */ Components.Schemas.ParticipantSchema[];
            export interface $204 {
            }
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
        }
    }
}

export interface OperationMethods {
  /**
   * accounts_api_get_user_by_id - Get User By Id
   */
  'accounts_api_get_user_by_id'(
    parameters?: Parameters<Paths.AccountsApiGetUserById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiGetUserById.Responses.$201 | Paths.AccountsApiGetUserById.Responses.$204>
  /**
   * accounts_api_update_user - Update User
   */
  'accounts_api_update_user'(
    parameters?: Parameters<Paths.AccountsApiUpdateUser.PathParameters> | null,
    data?: Paths.AccountsApiUpdateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiUpdateUser.Responses.$201>
  /**
   * accounts_api_get_user_by_username - Get User By Username
   */
  'accounts_api_get_user_by_username'(
    parameters?: Parameters<Paths.AccountsApiGetUserByUsername.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiGetUserByUsername.Responses.$201 | Paths.AccountsApiGetUserByUsername.Responses.$204>
  /**
   * accounts_api_get_active_non_staff_users - Get Active Non Staff Users
   */
  'accounts_api_get_active_non_staff_users'(
    parameters?: Parameters<Paths.AccountsApiGetActiveNonStaffUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AccountsApiGetActiveNonStaffUsers.Responses.$201>
  /**
   * participants_api_get_participants_for_user - Get Participants For User
   */
  'participants_api_get_participants_for_user'(
    parameters?: Parameters<Paths.ParticipantsApiGetParticipantsForUser.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiGetParticipantsForUser.Responses.$201 | Paths.ParticipantsApiGetParticipantsForUser.Responses.$204>
  /**
   * participants_api_update_participant - Update Participant
   */
  'participants_api_update_participant'(
    parameters?: Parameters<Paths.ParticipantsApiUpdateParticipant.PathParameters> | null,
    data?: Paths.ParticipantsApiUpdateParticipant.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiUpdateParticipant.Responses.$201>
  /**
   * participants_api_reactivate_participant - Reactivate Participant
   */
  'participants_api_reactivate_participant'(
    parameters?: Parameters<Paths.ParticipantsApiReactivateParticipant.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiReactivateParticipant.Responses.$201>
  /**
   * participants_api_deactivate_participant - Deactivate Participant
   */
  'participants_api_deactivate_participant'(
    parameters?: Parameters<Paths.ParticipantsApiDeactivateParticipant.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiDeactivateParticipant.Responses.$201>
  /**
   * participants_api_get_participant_comments - Get Participant Comments
   */
  'participants_api_get_participant_comments'(
    parameters?: Parameters<Paths.ParticipantsApiGetParticipantComments.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiGetParticipantComments.Responses.$200 | Paths.ParticipantsApiGetParticipantComments.Responses.$204>
  /**
   * participants_api_create_participant_comment - Create Participant Comment
   */
  'participants_api_create_participant_comment'(
    parameters?: Parameters<Paths.ParticipantsApiCreateParticipantComment.PathParameters> | null,
    data?: Paths.ParticipantsApiCreateParticipantComment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ParticipantsApiCreateParticipantComment.Responses.$201>
}

export interface PathsDictionary {
  ['/api/users/{user_id}']: {
    /**
     * accounts_api_get_user_by_id - Get User By Id
     */
    'get'(
      parameters?: Parameters<Paths.AccountsApiGetUserById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiGetUserById.Responses.$201 | Paths.AccountsApiGetUserById.Responses.$204>
    /**
     * accounts_api_update_user - Update User
     */
    'patch'(
      parameters?: Parameters<Paths.AccountsApiUpdateUser.PathParameters> | null,
      data?: Paths.AccountsApiUpdateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiUpdateUser.Responses.$201>
  }
  ['/api/users/username/{username}']: {
    /**
     * accounts_api_get_user_by_username - Get User By Username
     */
    'get'(
      parameters?: Parameters<Paths.AccountsApiGetUserByUsername.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiGetUserByUsername.Responses.$201 | Paths.AccountsApiGetUserByUsername.Responses.$204>
  }
  ['/api/users/active/non-staff']: {
    /**
     * accounts_api_get_active_non_staff_users - Get Active Non Staff Users
     */
    'get'(
      parameters?: Parameters<Paths.AccountsApiGetActiveNonStaffUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AccountsApiGetActiveNonStaffUsers.Responses.$201>
  }
  ['/api/participants/user/{user_id}/participants']: {
    /**
     * participants_api_get_participants_for_user - Get Participants For User
     */
    'get'(
      parameters?: Parameters<Paths.ParticipantsApiGetParticipantsForUser.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiGetParticipantsForUser.Responses.$201 | Paths.ParticipantsApiGetParticipantsForUser.Responses.$204>
  }
  ['/api/participants/{participant_id}']: {
    /**
     * participants_api_update_participant - Update Participant
     */
    'patch'(
      parameters?: Parameters<Paths.ParticipantsApiUpdateParticipant.PathParameters> | null,
      data?: Paths.ParticipantsApiUpdateParticipant.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiUpdateParticipant.Responses.$201>
  }
  ['/api/participants/{participant_id}/reactivate']: {
    /**
     * participants_api_reactivate_participant - Reactivate Participant
     */
    'patch'(
      parameters?: Parameters<Paths.ParticipantsApiReactivateParticipant.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiReactivateParticipant.Responses.$201>
  }
  ['/api/participants/{participant_id}/deactivate']: {
    /**
     * participants_api_deactivate_participant - Deactivate Participant
     */
    'patch'(
      parameters?: Parameters<Paths.ParticipantsApiDeactivateParticipant.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiDeactivateParticipant.Responses.$201>
  }
  ['/api/participants/{participant_id}/comments']: {
    /**
     * participants_api_get_participant_comments - Get Participant Comments
     */
    'get'(
      parameters?: Parameters<Paths.ParticipantsApiGetParticipantComments.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiGetParticipantComments.Responses.$200 | Paths.ParticipantsApiGetParticipantComments.Responses.$204>
    /**
     * participants_api_create_participant_comment - Create Participant Comment
     */
    'post'(
      parameters?: Parameters<Paths.ParticipantsApiCreateParticipantComment.PathParameters> | null,
      data?: Paths.ParticipantsApiCreateParticipantComment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ParticipantsApiCreateParticipantComment.Responses.$201>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
