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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          badge_key: string
          id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          badge_key: string
          id?: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          badge_key?: string
          id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: []
      }
      difficulties: {
        Row: {
          coach_reply: string | null
          created_at: string
          custom_subject: string | null
          description: string
          id: string
          resolved: boolean
          severity: Database["public"]["Enums"]["issue_severity"]
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
        }
        Insert: {
          coach_reply?: string | null
          created_at?: string
          custom_subject?: string | null
          description: string
          id?: string
          resolved?: boolean
          severity?: Database["public"]["Enums"]["issue_severity"]
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
        }
        Update: {
          coach_reply?: string | null
          created_at?: string
          custom_subject?: string | null
          description?: string
          id?: string
          resolved?: boolean
          severity?: Database["public"]["Enums"]["issue_severity"]
          subject?: Database["public"]["Enums"]["subject_type"]
          user_id?: string
        }
        Relationships: []
      }
      exams: {
        Row: {
          chapters: string | null
          created_at: string
          custom_subject: string | null
          exam_date: string
          grade: number | null
          id: string
          photo_url: string | null
          stress_level: Database["public"]["Enums"]["stress_level"]
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
        }
        Insert: {
          chapters?: string | null
          created_at?: string
          custom_subject?: string | null
          exam_date: string
          grade?: number | null
          id?: string
          photo_url?: string | null
          stress_level?: Database["public"]["Enums"]["stress_level"]
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
        }
        Update: {
          chapters?: string | null
          created_at?: string
          custom_subject?: string | null
          exam_date?: string
          grade?: number | null
          id?: string
          photo_url?: string | null
          stress_level?: Database["public"]["Enums"]["stress_level"]
          subject?: Database["public"]["Enums"]["subject_type"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string
          created_at: string
          id: string
          last_activity_date: string | null
          pseudo: string
          streak: number
          total_xp: number
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar?: string
          created_at?: string
          id?: string
          last_activity_date?: string | null
          pseudo: string
          streak?: number
          total_xp?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar?: string
          created_at?: string
          id?: string
          last_activity_date?: string | null
          pseudo?: string
          streak?: number
          total_xp?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quests: {
        Row: {
          assigned_to: string | null
          completed: boolean
          completed_at: string | null
          created_at: string
          created_by: string | null
          deadline: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          subject: Database["public"]["Enums"]["subject_type"]
          title: string
          xp_reward: number
        }
        Insert: {
          assigned_to?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          subject: Database["public"]["Enums"]["subject_type"]
          title: string
          xp_reward?: number
        }
        Update: {
          assigned_to?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          subject?: Database["public"]["Enums"]["subject_type"]
          title?: string
          xp_reward?: number
        }
        Relationships: []
      }
      student_baselines: {
        Row: {
          created_at: string
          id: string
          initial_grades: Json
          initial_quest_completion_rate: number
          initial_streak: number
          initial_total_hours: number
          initial_total_xp: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          initial_grades?: Json
          initial_quest_completion_rate?: number
          initial_streak?: number
          initial_total_hours?: number
          initial_total_xp?: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          initial_grades?: Json
          initial_quest_completion_rate?: number
          initial_streak?: number
          initial_total_hours?: number
          initial_total_xp?: number
          user_id?: string
        }
        Relationships: []
      }
      student_tasks: {
        Row: {
          completed: boolean
          completed_at: string | null
          created_at: string
          custom_subject: string | null
          deadline: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          estimated_minutes: number | null
          id: string
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
          xp_reward: number
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          custom_subject?: string | null
          deadline?: string | null
          description: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          estimated_minutes?: number | null
          id?: string
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
          xp_reward?: number
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          custom_subject?: string | null
          deadline?: string | null
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          estimated_minutes?: number | null
          id?: string
          subject?: Database["public"]["Enums"]["subject_type"]
          user_id?: string
          xp_reward?: number
        }
        Relationships: []
      }
      timer_sessions: {
        Row: {
          created_at: string
          duration_minutes: number
          id: string
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
          xp_earned: number
        }
        Insert: {
          created_at?: string
          duration_minutes: number
          id?: string
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
          xp_earned?: number
        }
        Update: {
          created_at?: string
          duration_minutes?: number
          id?: string
          subject?: Database["public"]["Enums"]["subject_type"]
          user_id?: string
          xp_earned?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      weekly_plans: {
        Row: {
          created_at: string
          created_by: string
          id: string
          plan_content: string
          user_id: string
          validated: boolean
          validated_at: string | null
          week_start: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          plan_content: string
          user_id: string
          validated?: boolean
          validated_at?: string | null
          week_start: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          plan_content?: string
          user_id?: string
          validated?: boolean
          validated_at?: string | null
          week_start?: string
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
      app_role: "coach" | "student"
      difficulty_level: "easy" | "medium" | "hard"
      issue_severity: "blocking" | "fragile" | "ok"
      stress_level: "stressed" | "neutral" | "calm"
      subject_type:
        | "Maths"
        | "Français"
        | "Physique"
        | "SES"
        | "Anglais"
        | "Autre"
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
      app_role: ["coach", "student"],
      difficulty_level: ["easy", "medium", "hard"],
      issue_severity: ["blocking", "fragile", "ok"],
      stress_level: ["stressed", "neutral", "calm"],
      subject_type: [
        "Maths",
        "Français",
        "Physique",
        "SES",
        "Anglais",
        "Autre",
      ],
    },
  },
} as const
