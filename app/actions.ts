'use server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://akufmgyltmzzfypsqmll.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrdWZtZ3lsdG16emZ5cHNxbWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNDU0MDksImV4cCI6MjA0ODkyMTQwOX0.kb_JHFPDDkh2VSQ9z3FvPRQ_DEpgh1ryGYZQvqjdh84")
 
export async function obtenerSocios() {
    const { data, error } = await supabase
    .from('socios')
    .select()
    console.log(typeof data, error);
    return data!.map(e => ({
       ...e,id: e.socioid,
    }));
}

export async function obtenerRepresentantes() {
    const { data, error } = await supabase
    .from('representantes')
    .select()
    console.log(data, error);
    return data!.map(e => ({
       ...e,id: e.socioid,
    }));
}

export async function obtenerPrestamos() {
    const { data, error } = await supabase
    .from('prestamos')
    .select()
    console.log(typeof data, error);
    return data!.map(e => ({
       ...e,id: e.socioid,
    }));
}

export async function obtenerTransacciones() {
    const { data, error } = await supabase
    .from('prestamos')
    .select()
    console.log(typeof data, error);
    return data!.map(e => ({
       ...e,id: e.socioid,
    }));
}

