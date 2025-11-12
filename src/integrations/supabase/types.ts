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
          additional_info: string | null
          alimony_child_support: number | null
          auto_loans: number | null
          bankruptcy_history: boolean | null
          business_ownership: number | null
          can_provide_proof: boolean | null
          cash_on_hand: number | null
          checking_balance: number | null
          city: string | null
          comfort_auto_debit: boolean | null
          comfort_discussing_financing: number | null
          commitment_level: number | null
          confidence_impact: string | null
          consent_credit_pull: boolean | null
          considering_treatment_time: string | null
          created_at: string | null
          credit_card_balances: number | null
          credit_score: number | null
          date_of_birth: string | null
          decision_making_style: string | null
          drivers_license: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relationship: string | null
          employer_name: string | null
          employment_status: string | null
          estimated_cost: number | null
          estimated_treatment_cost: number | null
          expected_procedures: string | null
          financing_preferences: string | null
          first_name: string
          foreclosure_history: boolean | null
          home_city: string | null
          home_equity: number | null
          home_state: string | null
          home_street_address: string | null
          home_street_address_2: string | null
          home_zip: string | null
          household_total_income: number | null
          id: string
          insurance_coverage: string | null
          investments: number | null
          job_title: string | null
          last_name: string
          late_payments: number | null
          length_of_employment: string | null
          marital_status: string | null
          medical_bills: number | null
          middle_name: string | null
          mobile_phone: string | null
          monthly_housing_cost: number | null
          monthly_income: number | null
          monthly_net_income: number | null
          mortgage_balance: number | null
          negative_experiences: string | null
          obstacles: string | null
          open_credit_lines: number | null
          other_income: number | null
          others_involved: string | null
          owned_vehicles: number | null
          pain_level: number | null
          pay_frequency: string | null
          personal_loans: number | null
          previous_address: string | null
          previous_city: string | null
          previous_state: string | null
          previous_street_address: string | null
          previous_street_address_2: string | null
          previous_treatment: string | null
          previous_zip: string | null
          primary_motivator: string | null
          primary_reason: string | null
          priority_preference: string | null
          ready_for_call: boolean | null
          ready_for_deposit: boolean | null
          ready_to_proceed: string | null
          recent_major_purchases: string | null
          referring_contact_info: string | null
          referring_practice: string | null
          referring_provider_email: string | null
          referring_provider_name: string | null
          rent_or_own: string | null
          retirement_accounts: number | null
          savings_balance: number | null
          secondary_income_sources: string | null
          secondary_phone: string | null
          sex: string | null
          signature_data: Json | null
          spouse_employer: string | null
          spouse_income: number | null
          ssn: string | null
          state: string | null
          street_address: string | null
          student_loans: number | null
          target_payment_range: string | null
          time_at_address: string | null
          timeline_urgency: string | null
          trust_factors: string | null
          work_phone: string | null
          years_at_job: number | null
          zip_code: string | null
        }
        Insert: {
          additional_info?: string | null
          alimony_child_support?: number | null
          auto_loans?: number | null
          bankruptcy_history?: boolean | null
          business_ownership?: number | null
          can_provide_proof?: boolean | null
          cash_on_hand?: number | null
          checking_balance?: number | null
          city?: string | null
          comfort_auto_debit?: boolean | null
          comfort_discussing_financing?: number | null
          commitment_level?: number | null
          confidence_impact?: string | null
          consent_credit_pull?: boolean | null
          considering_treatment_time?: string | null
          created_at?: string | null
          credit_card_balances?: number | null
          credit_score?: number | null
          date_of_birth?: string | null
          decision_making_style?: string | null
          drivers_license?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          employer_name?: string | null
          employment_status?: string | null
          estimated_cost?: number | null
          estimated_treatment_cost?: number | null
          expected_procedures?: string | null
          financing_preferences?: string | null
          first_name: string
          foreclosure_history?: boolean | null
          home_city?: string | null
          home_equity?: number | null
          home_state?: string | null
          home_street_address?: string | null
          home_street_address_2?: string | null
          home_zip?: string | null
          household_total_income?: number | null
          id?: string
          insurance_coverage?: string | null
          investments?: number | null
          job_title?: string | null
          last_name: string
          late_payments?: number | null
          length_of_employment?: string | null
          marital_status?: string | null
          medical_bills?: number | null
          middle_name?: string | null
          mobile_phone?: string | null
          monthly_housing_cost?: number | null
          monthly_income?: number | null
          monthly_net_income?: number | null
          mortgage_balance?: number | null
          negative_experiences?: string | null
          obstacles?: string | null
          open_credit_lines?: number | null
          other_income?: number | null
          others_involved?: string | null
          owned_vehicles?: number | null
          pain_level?: number | null
          pay_frequency?: string | null
          personal_loans?: number | null
          previous_address?: string | null
          previous_city?: string | null
          previous_state?: string | null
          previous_street_address?: string | null
          previous_street_address_2?: string | null
          previous_treatment?: string | null
          previous_zip?: string | null
          primary_motivator?: string | null
          primary_reason?: string | null
          priority_preference?: string | null
          ready_for_call?: boolean | null
          ready_for_deposit?: boolean | null
          ready_to_proceed?: string | null
          recent_major_purchases?: string | null
          referring_contact_info?: string | null
          referring_practice?: string | null
          referring_provider_email?: string | null
          referring_provider_name?: string | null
          rent_or_own?: string | null
          retirement_accounts?: number | null
          savings_balance?: number | null
          secondary_income_sources?: string | null
          secondary_phone?: string | null
          sex?: string | null
          signature_data?: Json | null
          spouse_employer?: string | null
          spouse_income?: number | null
          ssn?: string | null
          state?: string | null
          street_address?: string | null
          student_loans?: number | null
          target_payment_range?: string | null
          time_at_address?: string | null
          timeline_urgency?: string | null
          trust_factors?: string | null
          work_phone?: string | null
          years_at_job?: number | null
          zip_code?: string | null
        }
        Update: {
          additional_info?: string | null
          alimony_child_support?: number | null
          auto_loans?: number | null
          bankruptcy_history?: boolean | null
          business_ownership?: number | null
          can_provide_proof?: boolean | null
          cash_on_hand?: number | null
          checking_balance?: number | null
          city?: string | null
          comfort_auto_debit?: boolean | null
          comfort_discussing_financing?: number | null
          commitment_level?: number | null
          confidence_impact?: string | null
          consent_credit_pull?: boolean | null
          considering_treatment_time?: string | null
          created_at?: string | null
          credit_card_balances?: number | null
          credit_score?: number | null
          date_of_birth?: string | null
          decision_making_style?: string | null
          drivers_license?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relationship?: string | null
          employer_name?: string | null
          employment_status?: string | null
          estimated_cost?: number | null
          estimated_treatment_cost?: number | null
          expected_procedures?: string | null
          financing_preferences?: string | null
          first_name?: string
          foreclosure_history?: boolean | null
          home_city?: string | null
          home_equity?: number | null
          home_state?: string | null
          home_street_address?: string | null
          home_street_address_2?: string | null
          home_zip?: string | null
          household_total_income?: number | null
          id?: string
          insurance_coverage?: string | null
          investments?: number | null
          job_title?: string | null
          last_name?: string
          late_payments?: number | null
          length_of_employment?: string | null
          marital_status?: string | null
          medical_bills?: number | null
          middle_name?: string | null
          mobile_phone?: string | null
          monthly_housing_cost?: number | null
          monthly_income?: number | null
          monthly_net_income?: number | null
          mortgage_balance?: number | null
          negative_experiences?: string | null
          obstacles?: string | null
          open_credit_lines?: number | null
          other_income?: number | null
          others_involved?: string | null
          owned_vehicles?: number | null
          pain_level?: number | null
          pay_frequency?: string | null
          personal_loans?: number | null
          previous_address?: string | null
          previous_city?: string | null
          previous_state?: string | null
          previous_street_address?: string | null
          previous_street_address_2?: string | null
          previous_treatment?: string | null
          previous_zip?: string | null
          primary_motivator?: string | null
          primary_reason?: string | null
          priority_preference?: string | null
          ready_for_call?: boolean | null
          ready_for_deposit?: boolean | null
          ready_to_proceed?: string | null
          recent_major_purchases?: string | null
          referring_contact_info?: string | null
          referring_practice?: string | null
          referring_provider_email?: string | null
          referring_provider_name?: string | null
          rent_or_own?: string | null
          retirement_accounts?: number | null
          savings_balance?: number | null
          secondary_income_sources?: string | null
          secondary_phone?: string | null
          sex?: string | null
          signature_data?: Json | null
          spouse_employer?: string | null
          spouse_income?: number | null
          ssn?: string | null
          state?: string | null
          street_address?: string | null
          student_loans?: number | null
          target_payment_range?: string | null
          time_at_address?: string | null
          timeline_urgency?: string | null
          trust_factors?: string | null
          work_phone?: string | null
          years_at_job?: number | null
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
