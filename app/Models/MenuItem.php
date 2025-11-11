<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class MenuItem extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'subtitle',
        'description',
        'price',
        'currency',
        'is_available',
        'is_featured',
        'image_url',
        'tags',
        'display_order',
    ];

    protected $casts = [
        'price' => 'integer',
        'is_available' => 'boolean',
        'is_featured' => 'boolean',
        'tags' => 'array',
        'display_order' => 'integer',
        'deleted_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    protected static function booted(): void
    {
        static::creating(function (MenuItem $item) {
            if (blank($item->slug)) {
                $item->slug = Str::slug($item->name);
            }
        });

        static::updating(function (MenuItem $item) {
            if ($item->isDirty('name') && blank($item->slug)) {
                $item->slug = Str::slug($item->name);
            }
        });
    }

    public function getFormattedPriceAttribute(): string
    {
        return number_format((float) $this->price) . ' تومان';
    }
}
