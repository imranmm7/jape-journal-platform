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
      manuscript_status_history: {
        Row: {
          changed_by: string
          created_at: string
          id: string
          manuscript_id: string
          new_status: Database["public"]["Enums"]["manuscript_status"]
          note: string | null
          old_status: Database["public"]["Enums"]["manuscript_status"] | null
        }
        Insert: {
          changed_by: string
          created_at?: string
          id?: string
          manuscript_id: string
          new_status: Database["public"]["Enums"]["manuscript_status"]
          note?: string | null
          old_status?: Database["public"]["Enums"]["manuscript_status"] | null
        }
        Update: {
          changed_by?: string
          created_at?: string
          id?: string
          manuscript_id?: string
          new_status?: Database["public"]["Enums"]["manuscript_status"]
          note?: string | null
          old_status?: Database["public"]["Enums"]["manuscript_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "manuscript_status_history_manuscript_id_fkey"
            columns: ["manuscript_id"]
            isOneToOne: false
            referencedRelation: "manuscripts"
            referencedColumns: ["id"]
          },
        ]
      }
      manuscripts: {
        Row: {
          abstract: string
          affiliation: string
          article_type: string
          assigned_editor_id: string | null
          author_id: string
          co_authors: string | null
          corresponding_author: string
          cover_letter: string | null
          created_at: string
          email: string
          file_url: string | null
          id: string
          keywords: string
          status: Database["public"]["Enums"]["manuscript_status"]
          title: string
          updated_at: string
        }
        Insert: {
          abstract: string
          affiliation: string
          article_type: string
          assigned_editor_id?: string | null
          author_id: string
          co_authors?: string | null
          corresponding_author: string
          cover_letter?: string | null
          created_at?: string
          email: string
          file_url?: string | null
          id?: string
          keywords: string
          status?: Database["public"]["Enums"]["manuscript_status"]
          title: string
          updated_at?: string
        }
        Update: {
          abstract?: string
          affiliation?: string
          article_type?: string
          assigned_editor_id?: string | null
          author_id?: string
          co_authors?: string | null
          corresponding_author?: string
          cover_letter?: string | null
          created_at?: string
          email?: string
          file_url?: string | null
          id?: string
          keywords?: string
          status?: Database["public"]["Enums"]["manuscript_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          assigned_at: string
          comments: string | null
          completed_at: string | null
          confidential_comments: string | null
          id: string
          is_completed: boolean
          manuscript_id: string
          recommendation: string | null
          reviewer_id: string
        }
        Insert: {
          assigned_at?: string
          comments?: string | null
          completed_at?: string | null
          confidential_comments?: string | null
          id?: string
          is_completed?: boolean
          manuscript_id: string
          recommendation?: string | null
          reviewer_id: string
        }
        Update: {
          assigned_at?: string
          comments?: string | null
          completed_at?: string | null
          confidential_comments?: string | null
          id?: string
          is_completed?: boolean
          manuscript_id?: string
          recommendation?: string | null
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_manuscript_id_fkey"
            columns: ["manuscript_id"]
            isOneToOne: false
            referencedRelation: "manuscripts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      app_role: "author" | "reviewer" | "editor"
      manuscript_status:
        | "submitted"
        | "under_review"
        | "in_peer_review"
        | "revision_required"
        | "revised"
        | "accepted"
        | "rejected"
        | "published"
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
      app_role: ["author", "reviewer", "editor"],
      manuscript_status: [
        "submitted",
        "under_review",
        "in_peer_review",
        "revision_required",
        "revised",
        "accepted",
        "rejected",
        "published",
      ],
    },
  },
} as const
