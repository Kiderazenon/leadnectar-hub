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
      activities: {
        Row: {
          company_id: string | null
          contact_id: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          status: string | null
          team_id: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          status?: string | null
          team_id?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          status?: string | null
          team_id?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          account_owner: string | null
          address: string | null
          annual_revenue: number | null
          city: string | null
          country: string | null
          created_at: string | null
          custom_fields: Json | null
          description: string | null
          email: string | null
          employee_count: number | null
          facebook: string | null
          founding_year: number | null
          id: string
          industry: string | null
          instagram: string | null
          legal_id: string | null
          legal_status: string | null
          linkedin: string | null
          logo_url: string | null
          name: string
          notes: string | null
          other_social: Json | null
          phone: string | null
          postal_code: string | null
          relationship_type: string | null
          source: string | null
          state: string | null
          team_id: string | null
          twitter: string | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          account_owner?: string | null
          address?: string | null
          annual_revenue?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          description?: string | null
          email?: string | null
          employee_count?: number | null
          facebook?: string | null
          founding_year?: number | null
          id?: string
          industry?: string | null
          instagram?: string | null
          legal_id?: string | null
          legal_status?: string | null
          linkedin?: string | null
          logo_url?: string | null
          name: string
          notes?: string | null
          other_social?: Json | null
          phone?: string | null
          postal_code?: string | null
          relationship_type?: string | null
          source?: string | null
          state?: string | null
          team_id?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          account_owner?: string | null
          address?: string | null
          annual_revenue?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          description?: string | null
          email?: string | null
          employee_count?: number | null
          facebook?: string | null
          founding_year?: number | null
          id?: string
          industry?: string | null
          instagram?: string | null
          legal_id?: string | null
          legal_status?: string | null
          linkedin?: string | null
          logo_url?: string | null
          name?: string
          notes?: string | null
          other_social?: Json | null
          phone?: string | null
          postal_code?: string | null
          relationship_type?: string | null
          source?: string | null
          state?: string | null
          team_id?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          address: string | null
          address_complement: string | null
          birth_date: string | null
          city: string | null
          company_name: string | null
          contact_owner: string | null
          country: string | null
          created_at: string | null
          custom_fields: Json | null
          email: string | null
          facebook: string | null
          first_name: string | null
          gender: string | null
          id: string
          instagram: string | null
          job_title: string | null
          last_name: string | null
          linkedin: string | null
          mobile_phone: string | null
          notes: string | null
          other_social: string | null
          phone: string | null
          postal_code: string | null
          source: string | null
          state: string | null
          status: string | null
          team_id: string | null
          twitter: string | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          address_complement?: string | null
          birth_date?: string | null
          city?: string | null
          company_name?: string | null
          contact_owner?: string | null
          country?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          facebook?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          instagram?: string | null
          job_title?: string | null
          last_name?: string | null
          linkedin?: string | null
          mobile_phone?: string | null
          notes?: string | null
          other_social?: string | null
          phone?: string | null
          postal_code?: string | null
          source?: string | null
          state?: string | null
          status?: string | null
          team_id?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          address_complement?: string | null
          birth_date?: string | null
          city?: string | null
          company_name?: string | null
          contact_owner?: string | null
          country?: string | null
          created_at?: string | null
          custom_fields?: Json | null
          email?: string | null
          facebook?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          instagram?: string | null
          job_title?: string | null
          last_name?: string | null
          linkedin?: string | null
          mobile_phone?: string | null
          notes?: string | null
          other_social?: string | null
          phone?: string | null
          postal_code?: string | null
          source?: string | null
          state?: string | null
          status?: string | null
          team_id?: string | null
          twitter?: string | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          firstname: string | null
          id: string
          lastname: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          firstname?: string | null
          id: string
          lastname?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          team_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string | null
          team_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          team_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_team_member: {
        Args: {
          user_id: string
          team_id: string
        }
        Returns: boolean
      }
      is_team_owner: {
        Args: {
          user_id: string
          team_id: string
        }
        Returns: boolean
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
