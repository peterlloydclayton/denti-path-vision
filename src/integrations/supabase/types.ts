export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      interested_parties: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string | null
          party_type: Database["public"]["Enums"]["party_type"]
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          party_type: Database["public"]["Enums"]["party_type"]
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          party_type?: Database["public"]["Enums"]["party_type"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      temp_patient_applications: {
        Row: {
          alimony_child_support: number | null
          auto_loans: number | null
          bankruptcy_history: boolean | null
          business_ownership: number | null
          cash_on_hand: number | null
          checking_balance: number | null
          checking_savings: number | null
          city: string | null
          consent_credit_pull: boolean | null
          created_at: string | null
          credit_card_balances: number | null
          credit_cards: number | null
          date_of_birth: string | null
          email: string
          employer_name: string | null
          employment_status: string | null
          estimated_treatment_cost: number | null
          first_name: string
          foreclosure_history: boolean | null
          home_equity: number | null
          id: string
          investments: number | null
          last_name: string
          late_payments: number | null
          medical_bills: number | null
          mobile_phone: string | null
          monthly_housing_cost: number | null
          monthly_income: number | null
          mortgage_balance: number | null
          mortgage_rent: number | null
          open_credit_lines: number | null
          other_income: number | null
          owned_vehicles: number | null
          personal_loans: number | null
          referring_contact_info: string | null
          referring_practice: string | null
          referring_provider_email: string | null
          referring_provider_name: string | null
          retirement_accounts: number | null
          savings_balance: number | null
          signature_data: Json | null
          ssn: string | null
          state: string | null
          street_address: string | null
          student_loans: number | null
          zip_code: string | null
        }
        Insert: {
          alimony_child_support?: number | null
          auto_loans?: number | null
          bankruptcy_history?: boolean | null
          business_ownership?: number | null
          cash_on_hand?: number | null
          checking_balance?: number | null
          checking_savings?: number | null
          city?: string | null
          consent_credit_pull?: boolean | null
          created_at?: string | null
          credit_card_balances?: number | null
          credit_cards?: number | null
          date_of_birth?: string | null
          email: string
          employer_name?: string | null
          employment_status?: string | null
          estimated_treatment_cost?: number | null
          first_name: string
          foreclosure_history?: boolean | null
          home_equity?: number | null
          id?: string
          investments?: number | null
          last_name: string
          late_payments?: number | null
          medical_bills?: number | null
          mobile_phone?: string | null
          monthly_housing_cost?: number | null
          monthly_income?: number | null
          mortgage_balance?: number | null
          mortgage_rent?: number | null
          open_credit_lines?: number | null
          other_income?: number | null
          owned_vehicles?: number | null
          personal_loans?: number | null
          referring_contact_info?: string | null
          referring_practice?: string | null
          referring_provider_email?: string | null
          referring_provider_name?: string | null
          retirement_accounts?: number | null
          savings_balance?: number | null
          signature_data?: Json | null
          ssn?: string | null
          state?: string | null
          street_address?: string | null
          student_loans?: number | null
          zip_code?: string | null
        }
        Update: {
          alimony_child_support?: number | null
          auto_loans?: number | null
          bankruptcy_history?: boolean | null
          business_ownership?: number | null
          cash_on_hand?: number | null
          checking_balance?: number | null
          checking_savings?: number | null
          city?: string | null
          consent_credit_pull?: boolean | null
          created_at?: string | null
          credit_card_balances?: number | null
          credit_cards?: number | null
          date_of_birth?: string | null
          email?: string
          employer_name?: string | null
          employment_status?: string | null
          estimated_treatment_cost?: number | null
          first_name?: string
          foreclosure_history?: boolean | null
          home_equity?: number | null
          id?: string
          investments?: number | null
          last_name?: string
          late_payments?: number | null
          medical_bills?: number | null
          mobile_phone?: string | null
          monthly_housing_cost?: number | null
          monthly_income?: number | null
          mortgage_balance?: number | null
          mortgage_rent?: number | null
          open_credit_lines?: number | null
          other_income?: number | null
          owned_vehicles?: number | null
          personal_loans?: number | null
          referring_contact_info?: string | null
          referring_practice?: string | null
          referring_provider_email?: string | null
          referring_provider_name?: string | null
          retirement_accounts?: number | null
          savings_balance?: number | null
          signature_data?: Json | null
          ssn?: string | null
          state?: string | null
          street_address?: string | null
          student_loans?: number | null
          zip_code?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "patient" | "provider"
      party_type: "patient" | "provider" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "patient", "provider"],
      party_type: ["patient", "provider", "other"],
    },
  },
} as const
