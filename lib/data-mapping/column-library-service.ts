'use server';

import { getServerSupabase } from '@/lib/actions/supabase';
import type { ColumnDefinition } from '@/types/data-mapping';

export async function getColumnLibrary(): Promise<ColumnDefinition[]> {
  const supabase = await getServerSupabase();
  
  try {
    const { data, error } = await supabase
      .from('column_library')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching column library:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export async function addColumnDefinition(columnDef: Omit<ColumnDefinition, 'id'>): Promise<ColumnDefinition | null> {
  const supabase = await getServerSupabase();
  
  try {
    const { data, error } = await supabase
      .from('column_library')
      .insert([columnDef])
      .select()
      .single();

    if (error) {
      console.error('Error adding column definition:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function updateColumnDefinition(id: string, columnDef: Partial<ColumnDefinition>): Promise<ColumnDefinition | null> {
  const supabase = await getServerSupabase();
  
  try {
    const { data, error } = await supabase
      .from('column_library')
      .update(columnDef)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating column definition:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function deleteColumnDefinition(id: string): Promise<boolean> {
  const supabase = await getServerSupabase();
  
  try {
    const { error } = await supabase
      .from('column_library')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting column definition:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

