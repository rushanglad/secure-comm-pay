export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      matrix_conversations: {
        Row: {
          created_at: string
          id: string
          is_direct: boolean | null
          last_message: string | null
          last_message_timestamp: string | null
          room_avatar: string | null
          room_id: string
          room_name: string | null
          unread_count: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_direct?: boolean | null
          last_message?: string | null
          last_message_timestamp?: string | null
          room_avatar?: string | null
          room_id: string
          room_name?: string | null
          unread_count?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_direct?: boolean | null
          last_message?: string | null
          last_message_timestamp?: string | null
          room_avatar?: string | null
          room_id?: string
          room_name?: string | null
          unread_count?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      matrix_credentials: {
        Row: {
          access_token: string
          access_token_salt: string | null
          created_at: string
          device_id: string
          encrypted_access_token: string | null
          home_server: string
          id: string
          matrix_user_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          access_token_salt?: string | null
          created_at?: string
          device_id: string
          encrypted_access_token?: string | null
          home_server: string
          id?: string
          matrix_user_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          access_token_salt?: string | null
          created_at?: string
          device_id?: string
          encrypted_access_token?: string | null
          home_server?: string
          id?: string
          matrix_user_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          aadhaar_number: string | null
          avatar_url: string | null
          cbdc_wallet: string | null
          city: string | null
          country: string | null
          crypto_address: string | null
          dob: string | null
          id: string
          name: string | null
          phone_number: string | null
          secondary_email: string | null
          state: string | null
          updated_at: string | null
          upi_id: string | null
          username: string
          virtual_aadhaar: string | null
          wallet_address: string | null
        }
        Insert: {
          aadhaar_number?: string | null
          avatar_url?: string | null
          cbdc_wallet?: string | null
          city?: string | null
          country?: string | null
          crypto_address?: string | null
          dob?: string | null
          id: string
          name?: string | null
          phone_number?: string | null
          secondary_email?: string | null
          state?: string | null
          updated_at?: string | null
          upi_id?: string | null
          username: string
          virtual_aadhaar?: string | null
          wallet_address?: string | null
        }
        Update: {
          aadhaar_number?: string | null
          avatar_url?: string | null
          cbdc_wallet?: string | null
          city?: string | null
          country?: string | null
          crypto_address?: string | null
          dob?: string | null
          id?: string
          name?: string | null
          phone_number?: string | null
          secondary_email?: string | null
          state?: string | null
          updated_at?: string | null
          upi_id?: string | null
          username?: string
          virtual_aadhaar?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      basic_sanitize: {
        Args: { input: string }
        Returns: string
      }
      log_security_event: {
        Args: {
          p_action: string
          p_resource?: string
          p_details?: Json
          p_ip_address?: unknown
          p_user_agent?: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
