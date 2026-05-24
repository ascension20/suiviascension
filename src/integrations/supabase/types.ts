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
      daily_tasks: {
        Row: {
          completed: boolean
          created_at: string
          description: string
          id: string
          method: string
          subject: string
          task_date: string
          task_number: number
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          description: string
          id?: string
          method?: string
          subject?: string
          task_date?: string
          task_number: number
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          description?: string
          id?: string
          method?: string
          subject?: string
          task_date?: string
          task_number?: number
          user_id?: string
        }
        Relationships: []
      }
      xp_history: {
        Row: {
          id: string
          user_id: string
          amount: number
          source: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          source?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          source?: string
          created_at?: string
        }
        Relationships: []
      }
      deepwork_sessions: {
        Row: {
          created_at: string
          duration_seconds: number
          ended_at: string
          id: string
          started_at: string
          user_id: string
          xp_earned: number
        }
        Insert: {
          created_at?: string
          duration_seconds: number
          ended_at: string
          id?: string
          started_at: string
          user_id: string
          xp_earned?: number
        }
        Update: {
          created_at?: string
          duration_seconds?: number
          ended_at?: string
          id?: string
          started_at?: string
          user_id?: string
          xp_earned?: number
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
          coefficient: number
          created_at: string
          custom_subject: string | null
          exam_date: string
          grade: number | null
          grade_received: boolean
          id: string
          photo_url: string | null
          stress_level: Database["public"]["Enums"]["stress_level"]
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
        }
        Insert: {
          chapters?: string | null
          coefficient?: number
          created_at?: string
          custom_subject?: string | null
          exam_date: string
          grade?: number | null
          grade_received?: boolean
          id?: string
          photo_url?: string | null
          stress_level?: Database["public"]["Enums"]["stress_level"]
          subject: Database["public"]["Enums"]["subject_type"]
          user_id: string
        }
        Update: {
          chapters?: string | null
          coefficient?: number
          created_at?: string
          custom_subject?: string | null
          exam_date?: string
          grade?: number | null
          grade_received?: boolean
          id?: string
          photo_url?: string | null
          stress_level?: Database["public"]["Enums"]["stress_level"]
          subject?: Database["public"]["Enums"]["subject_type"]
          user_id?: string
        }
        Relationships: []
      }
      initial_grades: {
        Row: {
          coefficient: number
          created_at: string
          grade: number | null
          id: string
          subject: string
          user_id: string
        }
        Insert: {
          coefficient?: number
          created_at?: string
          grade?: number | null
          id?: string
          subject: string
          user_id: string
        }
        Update: {
          coefficient?: number
          created_at?: string
          grade?: number | null
          id?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      onboarding_data: {
        Row: {
          activities: string[]
          created_at: string
          engagement_signed: boolean
          first_name: string | null
          goals: string | null
          ical_url: string | null
          id: string
          language: string
          last_name: string | null
          options: string[]
          other_activity: string | null
          school_level: string | null
          school_name: string | null
          specialties: string[]
          timezone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activities?: string[]
          created_at?: string
          engagement_signed?: boolean
          first_name?: string | null
          goals?: string | null
          ical_url?: string | null
          id?: string
          language?: string
          last_name?: string | null
          options?: string[]
          other_activity?: string | null
          school_level?: string | null
          school_name?: string | null
          specialties?: string[]
          timezone?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activities?: string[]
          created_at?: string
          engagement_signed?: boolean
          first_name?: string | null
          goals?: string | null
          ical_url?: string | null
          id?: string
          language?: string
          last_name?: string | null
          options?: string[]
          other_activity?: string | null
          school_level?: string | null
          school_name?: string | null
          specialties?: string[]
          timezone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      planning_events: {
        Row: {
          created_at: string
          description: string | null
          end_time: string
          event_date: string
          ical_uid: string | null
          id: string
          linked_quest_id: string | null
          source: Database["public"]["Enums"]["event_source"]
          start_time: string
          subject: string | null
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string
          user_id: string
          validated: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time: string
          event_date: string
          ical_uid?: string | null
          id?: string
          linked_quest_id?: string | null
          source?: Database["public"]["Enums"]["event_source"]
          start_time: string
          subject?: string | null
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at?: string
          user_id: string
          validated?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string
          event_date?: string
          ical_uid?: string | null
          id?: string
          linked_quest_id?: string | null
          source?: Database["public"]["Enums"]["event_source"]
          start_time?: string
          subject?: string | null
          title?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string
          user_id?: string
          validated?: boolean
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string
          class_level: string | null
          created_at: string
          id: string
          last_activity_date: string | null
          onboarding_completed: boolean
          pseudo: string
          streak: number
          today_xp: number
          today_xp_date: string | null
          total_deepwork_seconds: number
          total_deepwork_sessions: number
          total_xp: number
          tutorial_completed: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar?: string
          class_level?: string | null
          created_at?: string
          id?: string
          last_activity_date?: string | null
          onboarding_completed?: boolean
          pseudo: string
          streak?: number
          today_xp?: number
          today_xp_date?: string | null
          total_deepwork_seconds?: number
          total_deepwork_sessions?: number
          total_xp?: number
          tutorial_completed?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar?: string
          class_level?: string | null
          created_at?: string
          id?: string
          last_activity_date?: string | null
          onboarding_completed?: boolean
          pseudo?: string
          streak?: number
          today_xp?: number
          today_xp_date?: string | null
          total_deepwork_seconds?: number
          total_deepwork_sessions?: number
          total_xp?: number
          tutorial_completed?: boolean
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
          priority: Database["public"]["Enums"]["task_priority"]
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
          priority?: Database["public"]["Enums"]["task_priority"]
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
          priority?: Database["public"]["Enums"]["task_priority"]
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
      user_private: {
        Row: {
          created_at: string
          ical_url: string | null
          last_seen_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          ical_url?: string | null
          last_seen_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          ical_url?: string | null
          last_seen_at?: string | null
          updated_at?: string
          user_id?: string
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
      bootstrap_first_coach: { Args: never; Returns: boolean }
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
      event_source: "manual" | "ical"
      event_type: "course" | "quest" | "ds"
      issue_severity: "blocking" | "fragile" | "ok"
      stress_level: "stressed" | "neutral" | "calm"
      subject_type:
        | "Maths"
        | "Français"
        | "Physique"
        | "SES"
        | "Anglais"
        | "Autre"
      task_priority: "low" | "medium" | "high"
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
      event_source: ["manual", "ical"],
      event_type: ["course", "quest", "ds"],
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
      task_priority: ["low", "medium", "high"],
    },
  },
} as const
